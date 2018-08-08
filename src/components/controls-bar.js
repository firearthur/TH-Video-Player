import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playPause, muteUnmute } from '../actions/control-bar-actions';


class ControlsBar extends Component {
  render() {
    const {
      onPlayAndPause, shouldPlay, isMuted, onMuteVolume,
    } = this.props;
    return (
      <View style={styles.controlBar} >
        <TouchableOpacity
          onPress={() => onPlayAndPause(shouldPlay)}
        >
          <Text style={{color:'white'}}>{shouldPlay ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          name={isMuted ? 'volume-mute' : 'volume-up'}
          onPress={() => onMuteVolume(isMuted)}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  controlBar: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

ControlsBar.propTypes = {
  shouldPlay: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  onPlayAndPause: PropTypes.func.isRequired,
  onMuteVolume: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  shouldPlay: state.controlBarReducer.shouldPlay,
  isMuted: state.controlBarReducer.isMuted,
});

const mapDispatchToProps = dispatch => ({
  onPlayAndPause: shouldPlayStatus => dispatch(playPause(shouldPlayStatus)),
  onMuteVolume: isMuteStatus => dispatch(muteUnmute(isMuteStatus)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ControlsBar);
