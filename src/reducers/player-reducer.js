import actions from '../actions/action-types';

const defaultState = {
  currentTime: 0,
  duration: 0,
  intervalID: 0,
  seekForward: null,
  seekBackward: null
};

const playerReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: payload.currentTime,
        intervalID: payload.intervalID
      };
    case actions.READY_SETUP:
      return {
        ...state,
        duration: payload.duration,
        seekForward: payload.seekForward,
        seekBackward: payload.seekBackward
      };
    default:
      return state;
  }
};

export default playerReducer;
