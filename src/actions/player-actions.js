export const readySetup = payload => ({
  type: 'READY_SETUP',
  payload
});

export const setPlayerRef = payload => ({
  type: 'SET_PLAYER_REF',
  payload
});

export const setCurrentTime = (currentTime, intervalID) => ({
  type: 'SET_CURRENT_TIME',
  payload: { currentTime, intervalID }
});

// export default savePlayerRef;

// import Data from '../instructions.json';
// export function getData() {
//   return (dispatch) => {
//     // Make API Call
//     // For this example, I will be using the sample data in the json file
//     // delay the retrieval [Sample reasons only]
//     setTimeout(() => {
//       const payload = Data.instructions;
//       dispatch({ type: actions.DATA_AVAILABLE, payload });
//     }, 2000);
//   };
// }
