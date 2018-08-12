import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import momentDuration from 'moment-duration-format';
import { Bar } from 'react-native-progress';
import { playPause } from '../actions/control-bar-actions';

// setup the moment duration plugin
momentDuration(moment);

const ControlsBar = ({
  onPlayAndPause,
  shouldPlay,
  playerReady,
  onTimeStart,
  currentTime,
  duration,
  tInterval
}) => {
  return (
    <View style={styles.controlBar}>
      <TouchableOpacity
        onPress={() => {
          onPlayAndPause(shouldPlay);
        }}
      >
        <Text>{shouldPlay ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
      {Platform.OS !== 'android' ? (
        <Text>This section is Android only</Text>
      ) : (
        <View style={styles.progressBar}>
          <Text>{moment.duration(currentTime, 'seconds').format('mm:ss')}</Text>

          <Bar
            progress={
              isNaN(currentTime / duration) ? 0 : currentTime / duration
            }
            width={200}
          />
          <Text>{moment.duration(duration, 'seconds').format('mm:ss')}</Text>

          {/* <Text>{moment.duration(currentTime, 'seconds').format('mm:ss')}</Text>

          <Bar
            progress={
              isNaN(currentTime / duration) ? 0 : currentTime / duration
            }
            width={200}
          />
          <Text>{moment.duration(duration, 'seconds').format('mm:ss')}</Text> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  controlBar: {
    width: Dimensions.get('window').width,
    height: 90,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

ControlsBar.propTypes = {
  shouldPlay: PropTypes.bool.isRequired,
  onPlayAndPause: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  shouldPlay: state.controlBarReducer.shouldPlay,
  currentTime: state.playerReducer.currentTime,
  tInterval: state.controlBarReducer.tInterval,
  playerReady: state.playerReducer.playerReady,
  duration: state.playerReducer.duration
});

const mapDispatchToProps = dispatch => ({
  onPlayAndPause: shouldPlayStatus => {
    dispatch(playPause(shouldPlayStatus));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsBar);
