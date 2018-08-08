import { combineReducers } from 'redux';
import controlBarReducer from './control-bar-reducer';

// Combine all the reducers
const rootReducer = combineReducers({
  controlBarReducer,
});

export default rootReducer;
