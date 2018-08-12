import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import YouTube from 'react-native-youtube';
import ControlsBar from './controls-bar';
import { lifecycle, compose } from 'recompose';
import {
  readySetup,
  setPlayerRef,
  setCurrentTime
} from '../actions/player-actions';
import API_KEY from './../../api-key';

class Player extends Component {
  render() {
    const {
      duration,
      shouldPlay,
      player,
      onSetPlayerRef,
      onCurrentTime,
      playerLoaded,
      onReadySetup
    } = this.props;

    return (
      <View style={styles.container}>
        <YouTube
          ref={component => {
            this.myRef = component;
          }}
          onReady={() => {
            this.myRef
              .duration()
              .then(duration => onReadySetup(duration))
              .catch(error => console.warn(error));

            const intervalID = setInterval(() => {
              this.myRef
                .currentTime()
                .then(currentTime => onCurrentTime(currentTime, intervalID))
                .catch(error => console.warn(error));
            }, 1000);
          }}
          resumePlayAndroid={false}
          controls={0}
          apiKey={API_KEY}
          videoId="3NhHqPA8nIs" // The YouTube video ID
          play={shouldPlay}
          // fullscreen // control whether the video should play in fullscreen or inline
          // loop // control whether the video should loop when ended
          // onChangeState={e => this.setState({ status: e.state })}
          // onChangeQuality={e => this.setState({ quality: e.quality })}
          // onError={e => this.setState({ error: e.error })}

          style={{ alignSelf: 'stretch', height: 300 }}
        />
        <ControlsBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

Player.propTypes = {
  shouldPlay: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  // const seen = [];
  // console.warn('state ', JSON.stringify(state, (key, val) => {
  //   if (val != null && typeof val === 'object') {
  //     if (seen.indexOf(val) >= 0) {
  //       return;
  //     }
  //     seen.push(val);
  //   }
  //   return val;
  // }, 2));

  return {
    shouldPlay: state.controlBarReducer.shouldPlay,
    playerLoaded: state.playerReducer.playerLoaded,
    duration: state.playerReducer.duration
  };
};

const mapDispatchToProps = dispatch => ({
  onReadySetup: duration => {
    dispatch(readySetup(duration));
  },
  onCurrentTime: (currentTime, intervalID) => {
    dispatch(setCurrentTime(currentTime, intervalID));
  },
  onSetPlayerRef: playerRef => dispatch(setPlayerRef(playerRef))
});

// const withTest = lifecycle({
//   componentDidMount() {
//     // console.warn('hi', JSON.stringify(this, null, 2));
//   }
// });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);

// export default compose(
//   withTest,
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )
// )(Player);
