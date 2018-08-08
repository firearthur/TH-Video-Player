import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import YouTube from 'react-native-youtube';
import ControlsBar from './controls-bar';
import API_KEY from './../../api-key';


class Player extends Component {
  render() {
    const { shouldPlay, isMuted } = this.props;
    const { width } = Dimensions.get('window');

    return (
      <View style={styles.container}>
        <YouTube
          apiKey={API_KEY}
          videoId="3NhHqPA8nIs" // The YouTube video ID
          play={shouldPlay}
          
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
    justifyContent: 'center',
  },
});


Player.propTypes = {
  shouldPlay: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  shouldPlay: state.controlBarReducer.shouldPlay,
  isMuted: state.controlBarReducer.isMuted,
});

export default connect(mapStateToProps)(Player);
