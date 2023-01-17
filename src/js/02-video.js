import Player from '@vimeo/player';
let  throttle = require('lodash.throttle');



const VIMEO_TIME_STORAGE = "videoplayer-current-time"


const iframeEl = document.getElementById('vimeo-player')
const playerVimeo = new Player(iframeEl);


playerVimeo.on('timeupdate', throttle(dataVimeo, 1000))


function dataVimeo ({seconds}) {
    save(VIMEO_TIME_STORAGE, seconds)
}

const save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error("Set state error: ", error.message);
    }
  }

  playerVimeo.setCurrentTime(JSON.parse(localStorage.getItem(VIMEO_TIME_STORAGE))).then(function(seconds) {

}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;
    }
});

