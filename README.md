# TH-Video-Player

* This is a YouTube video player that allows you to play a video by providing its ID as a prop.
* You can play/pause, see the progress meter, and seek forward and backward.
* You also can specify the duration of seeking (ex: 15 secs...)

## Tech used:
* React Native
* Redux
* Thunk async middleware
* Moment js for time manipulations.
* React-Native-YouTube module.
* Progress module.

## Setup:
* Clone the repo to your machine.
* Run `yarn install`.
* Run `react-native link`.
* Obtain an API key from YouTube by visiting this [page](https://developers.google.com/youtube/registering_an_application).
* Paste your API key in the empty string in the `example.api-key.js` file and rename it to `api-key.js`.
* Make sure you have an AVD (Android Virtual Machine) setup on you computer, or you can use a physical device(which could be faster).
* Run `react-native run-android`. **Note:** I noticed that sometimes the server fails to load the app at this step and the phone shows you a red screen saying the server is not running. You would have to open a new terminal tab and run `react-native start` and hit reload on the device.  

**Note:** 
* If you have any issues with the setup of your environment along the way you should check out this [page](https://facebook.github.io/react-native/docs/getting-started.html). Make sure you go to "building projects with react native" tab and find your setup there. 
* Some features are only supported by Android. 