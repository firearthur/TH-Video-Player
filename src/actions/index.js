// Import the sample data
import Data from '../instructions.json';
import actions from './action-types';


export function getData() {
  return (dispatch) => {
    // Make API Call
    // For this example, I will be using the sample data in the json file
    // delay the retrieval [Sample reasons only]
    setTimeout(() => {
      const payload = Data.instructions;
      dispatch({ type: actions.DATA_AVAILABLE, payload });
    }, 2000);
  };
}
