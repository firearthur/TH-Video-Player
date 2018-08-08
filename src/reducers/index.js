import { combineReducers } from 'redux';
import controlBarReducer from './control-bar-reducer';
import playerReducer from './player-reducer';
// Combine all the reducers
const rootReducer = combineReducers({
  controlBarReducer,
  playerReducer,
});

export default rootReducer;
