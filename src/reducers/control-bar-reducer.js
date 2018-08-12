import actions from '../actions/action-types';

const defaultState = {
  shouldPlay: false
};

const controlBarReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.PLAY_PAUSE:
      return { ...state, shouldPlay: !payload };
    default:
      return state;
  }
};

export default controlBarReducer;
