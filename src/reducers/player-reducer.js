import actions from '../actions/action-types';

const defaultState = { player: null, playerLoaded: false, playerReady: false };

const playerReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.SET_PLAYER_REF:
      return { ...state, player: payload, playerLoaded: true };
    // case actions.SET_PLAYER_REF:
    //   // mutating on puropse to prevent infinity re render and use only one ref
    //   state.player = payload;
    //   // state.player = Object.assign(state.player, payload);
    //   return state;
    case actions.READY_SETUP:
      // time middle ware happens
      return { ...state, playerReady: true };
    default:
      return state;
  }
};

export default playerReducer;
