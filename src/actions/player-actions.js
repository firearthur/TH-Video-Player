export const readySetup = (duration, seekForward, seekBackward) => ({
  type: 'READY_SETUP',
  payload: { duration, seekForward, seekBackward }
});

export const setCurrentTime = (currentTime, intervalID) => ({
  type: 'SET_CURRENT_TIME',
  payload: { currentTime, intervalID }
});
