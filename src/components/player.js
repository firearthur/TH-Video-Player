import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import YouTube from 'react-native-youtube';
import ControlsBar from './controls-bar';
import { readySetup, setCurrentTime } from '../actions/player-actions';
import API_KEY from './../../api-key';

class Player extends Component {
  render() {
    const { shouldPlay, onCurrentTime, onReadySetup } = this.props;

    return (
      <View style={styles.container}>
        <YouTube
          ref={component => {
            this.myRef = component;
          }}
          onReady={() => {
            this.myRef
              .duration()
              .then(duration => onReadySetup(duration, this.myRef))
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
  shouldPlay: PropTypes.bool.isRequired,
  onCurrentTime: PropTypes.func.isRequired,
  onReadySetup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  shouldPlay: state.controlBarReducer.shouldPlay
});

const mapDispatchToProps = dispatch => ({
  onReadySetup: (duration, playerRef) => {
    // what happens in the following is that I'm passing a copy of both seekFor and
    // seekBack with closure on the ref of player to be kep in redux state
    // then it can be invoked from the controls bar sperately
    dispatch(
      readySetup(
        duration,
        seekForwardFactory(playerRef),
        seekBackwardFactory(playerRef)
      )
    );
  },
  onCurrentTime: (currentTime, intervalID) => {
    dispatch(setCurrentTime(currentTime, intervalID));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);

// Factories with currying

const seekBackwardFactory = playerRef => (currentTime, numOfSecs) => {
  // if the seek is less than zero seek to beginning
  // otherwise seek normally
  const seekToSeconds =
    currentTime - numOfSecs < 0 ? 0 : numOfSecs - currentTime;
  playerRef.seekTo(seekToSeconds);
};

const seekForwardFactory = playerRef => (
  currentTime,
  videoDuration,
  numOfSecs
) => {
  // if the seek is over the duration seek to duration
  // otherwise seek normally
  const seekToSeconds =
    videoDuration - (currentTime + numOfSecs) < 0
      ? videoDuration
      : currentTime + numOfSecs;
  playerRef.seekTo(seekToSeconds);
};
