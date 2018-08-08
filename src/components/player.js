import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import YouTube from 'react-native-youtube';
import ControlsBar from './controls-bar';
import { readySetup, setPlayerRef } from '../actions/player-actions';
import API_KEY from './../../api-key';


class Player extends Component {
  // constructor(props) {
  //   super(props);
  //   this.myRef = React.createRef();
  // }
  // player = null;
  render() {
    const {
      shouldPlay, isMuted, player, onSetPlayerRef, playerLoaded,
      onReadySetup
    } = this.props;
    const { width } = Dimensions.get('window');
    // console.warn(YouTube.duration());
    return (
      <View style={styles.container} >
        <YouTube
          // ref={this.myRef}
          ref={(playerRef) => { !playerLoaded && onSetPlayerRef(playerRef);
          }}
          // onReady={
          //   e => (
          //     onSetPlayerRef(this.myRef)
          //   )
          // }

          // onReady={
          //   e => ( !playerLoaded &&
          //     onSetPlayerRef(this.myRef)
          //   )
          // }
          onReady={e => onReadySetup()}
          resumePlayAndroid={false}
          controls={0}
          apiKey={API_KEY}
          videoId="3NhHqPA8nIs" // The YouTube video ID
          play={shouldPlay}
          // onProgress={()=>{console.warn('I was called ')}}

          // fullscreen // control whether the video should play in fullscreen or inline
          // loop // control whether the video should loop when ended

          // onReady={e => this.setState({ isReady: true })}
          // onChangeState={e => this.setState({ status: e.state })}
          // onChangeQuality={e => this.setState({ quality: e.quality })}
          // onError={e => this.setState({ error: e.error })}

          style={{ alignSelf: 'stretch', height: 300 }}
        />
        {/* <Video
          // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          source={{ uri: 'https://www.youtube.com/watch?v=3NhHqPA8nIs' }}
          shouldPlay
          resizeMode="cover"
          style={{ width, height: 300 }}
          shouldPlay={shouldPlay}
          isMuted={isMuted}
        /> */}
        <ControlsBar player={player ? player : null} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


Player.propTypes = {
  shouldPlay: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
};

// const mapStateToProps = state => ({
//   shouldPlay: state.controlBarReducer.shouldPlay,
//   isMuted: state.controlBarReducer.isMuted,
//   player: state.playerReducer.player,
// });

const mapStateToProps = (state) => {
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
    isMuted: state.controlBarReducer.isMuted,
    player: state.playerReducer.player,
    playerLoaded: state.playerReducer.playerLoaded,
  };
};

const mapDispatchToProps = dispatch => ({
  onReadySetup: () => dispatch(readySetup()),
  onSetPlayerRef: playerRef => dispatch(setPlayerRef(playerRef)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Player);
