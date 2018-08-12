import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import momentDuration from 'moment-duration-format';
import { Bar } from 'react-native-progress';
import playPause from '../actions/control-bar-actions';

// setup the moment duration plugin
momentDuration(moment);

const ControlsBar = ({
  onPlayAndPause,
  shouldPlay,
  currentTime,
  duration,
  seekForward,
  seekBackward
}) => (
  <View style={styles.controlBar}>
    <View style={styles.controlsRow}>
      <TouchableOpacity
        onPress={() => {
          onPlayAndPause(shouldPlay);
        }}
      >
        <Text>{shouldPlay ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>

      <Text>{moment.duration(currentTime, 'seconds').format('mm:ss')}</Text>

      <Bar
        progress={isNaN(currentTime / duration) ? 0 : currentTime / duration}
        width={200}
      />
      <Text>{moment.duration(duration, 'seconds').format('mm:ss')}</Text>
    </View>

    <View style={styles.controlsRow}>
      <TouchableOpacity
        // you can change the amount of seconds to seek
        onPress={() => seekBackward && seekBackward(currentTime, 15)}
      >
        <Text>15 Sec back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => seekForward && seekForward(currentTime, duration, 15)}
      >
        <Text>15 Sec forward</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  controlBar: {
    width: Dimensions.get('window').width,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  controlsRow: {
    minWidth: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});

ControlsBar.propTypes = {
  shouldPlay: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onPlayAndPause: PropTypes.func.isRequired,
  seekForward: PropTypes.func,
  seekBackward: PropTypes.func
};

const mapStateToProps = state => ({
  shouldPlay: state.controlBarReducer.shouldPlay,
  currentTime: state.playerReducer.currentTime,
  duration: state.playerReducer.duration,
  seekForward: state.playerReducer.seekForward,
  seekBackward: state.playerReducer.seekBackward
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
