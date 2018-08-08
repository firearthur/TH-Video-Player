import actions from '../actions/action-types';

const defaultState = { isMuted: false, shouldPlay: true };

const controlBarReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.PLAY_PAUSE:
      return { ...state, shouldPlay: !payload };
    case actions.MUTE_UNMUTE:
      return { ...state, isMuted: !payload };
    default:
      return state;
  }
};

export default controlBarReducer;
