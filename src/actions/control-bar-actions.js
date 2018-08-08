export const playPause = payload => ({
  type: 'PLAY_PAUSE',
  payload,
});

export const muteUnmute = payload => ({
  type: 'MUTE_UNMUTE',
  payload,
});

export const startTime = ({ player, dispatch, shouldPlay, tInterval }) => {
  // add the interval
  if(shouldPlay){
    console.warn('should play called');
    const tInterval = setInterval(()=> {
      player.currentTime().then((currentTime) => {
        console.warn('then ')
        dispatch(() => ({ type: 'SET_CURRENT_TIME', payload: { currentTime, tInterval } }));
      }).catch(err => console.warn(JSON.stringify(err, null, 2)));      
    }, 1000)
  
  } else if (shouldPlay === false ){
    // stop the interval
    
    dispatch(() => (clearInterval(tInterval) && { type: 'UNSET_CURRENT_TIME', payload: { tInterval: -1 } }));
  }

  // player.currentTime().then((currentTime) => {
  //   dispatch(() => ({ type: 'SET_CURRENT_TIME', payload: { currentTime, tInterval: -1 } }));
  // }).catch(err => console.warn(JSON.stringify(err, null, 2)));
  // return {
  //   type: 'SET_CURRENT_TIME',
  //   payload,
  // };
};
