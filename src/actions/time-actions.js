export const continuePauseTime = payload => ({
  type: 'CONTINUE_PAUSE_TIME',
  payload,
});


export const setCurrentTime = payload => ({
  type: 'SET_CURRENT_TIME',
  payload,
});


// on ready
// 1- set current time to zero
// 2- duration to the actual duration of the video using moment
// 3- start the countdown
// onPlayPause play or pause the countdown
// when countdown is done stop the timer

// ref={player => {
//  savePlayerRef(player)
// }}
