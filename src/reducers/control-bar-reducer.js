import actions from '../actions/action-types';

const defaultState = {
  isMuted: false, shouldPlay: false, currentTime: 0, player: null, tInterval: -1,
};

const controlBarReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.PLAY_PAUSE:
      return { ...state, shouldPlay: !payload };
    case actions.MUTE_UNMUTE:
      return { ...state, isMuted: !payload };
    case actions.SET_CURRENT_TIME:
      return { ...state, currentTime: payload.currentTime, tInterval: payload.tInterval };
    default:
      return state;
  }
};

export default controlBarReducer;

