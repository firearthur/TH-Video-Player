import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playPause, muteUnmute, startTime } from '../actions/control-bar-actions';


class ControlsBar extends Component {
  render() {
    const {
      onPlayAndPause, shouldPlay, isMuted, playerReady, onMuteVolume, player, onTimeStart, currentTime, duration
    } = this.props;
    // console.warn('this is weird', player && player.duration );
    // console.warn('player ', ( playerReady && player && player.seekTo && player.seekTo(0)))
    // player && console.warn('i made ') && player.duration().then(time=>console.warn('time  ',time)).catch(err=> console.warn(JSON.stringify(err, null, 2))) && console.warn('i made here')
    // const seen = [];
    // console.warn('player ', JSON.stringify(player, (key, val) => {
    //   if (val != null && typeof val === 'object') {
    //     if (seen.indexOf(val) >= 0) {
    //       return;
    //     }
    //     seen.push(val);
    //   }
    //   return val;
    // }, 2));
    // console.warn('player', JSON.stringify(player, null, 2));
    return ( 
      <View style={styles.controlBar} >
        <Text>Time elpased: {currentTime.toString()}</Text>
        <TouchableOpacity
          onPress={() => {
    // console.warn('player 2', JSON.stringify(player, null, 2));
            
            onPlayAndPause(shouldPlay, player, shouldPlay, tInterval);
            // (dispatch) => startTime(player, dispatch,shouldPlay, tInterval);
            // player && onTimeStart(player, shouldPlay, tInterval)
            }}
        >
          <Text style={{ color: 'white' }}>{shouldPlay ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>


        {/* Platform.OS === 'android' && (

        <TouchableOpacity
          onPress={() =>
                (player
                  ? player
                      .currentTime()
                      .then(currentTime => onTimeStart(currentTime))
                      .catch(errorMessage => console.warn(errorMessage))
                  : player
                      .duration()
                      .then(duration => this.setState({ duration }))
                      .catch(errorMessage => this.setState({ error: errorMessage })))
              }
        >
          <Text style={styles.buttonText}>Update Progress & Duration (Android)</Text>
        </TouchableOpacity>
        ) */}


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
  currentTime: state.controlBarReducer.currentTime,
  tInterval: state.controlBarReducer.tInterval,
  playerReady: state.playerReducer.playerReady,
  startTime,
});

const mapDispatchToProps = dispatch => ({
  onPlayAndPause: (shouldPlayStatus, player, shouldPlay, tInterval) => {dispatch(playPause(shouldPlayStatus))
    startTime(player, dispatch,shouldPlay, tInterval)
  },
  onMuteVolume: isMuteStatus => dispatch(muteUnmute(isMuteStatus)),
  // receiveCurrentTime: currentTime => 
  // onTimeStart: (player, shouldPlay, tInterval) => dispatch(startTime(player, dispatch, shouldPlay, tInterval)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ControlsBar);
