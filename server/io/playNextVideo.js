var resetUserVotes = require('../helpers').resetUserVotes;
var isUndefined = require('../helpers').isUndefined;
var MAX_PREVIOUS_VIDEOS = require('../constants').MAX_PREVIOUS_VIDEOS;

function nextTest(roomVideos, videoId) {
  return roomVideos.current !== null && roomVideos.current.id === videoId;
}

module.exports = function playNextVideo(room) {
  return function(data){
    var previousId = room.videos.current.id;
    var submitVideo = require('./submit/submitVideo')(room);
    if(nextTest(room.videos, data.videoId)) {
      room.skipVotes = 0;
      room.videos.videoTime = 0;
      resetUserVotes(room.users);
      if(room.videos.previous.length > MAX_PREVIOUS_VIDEOS) {
        room.videos.previous.pop();
      }
      room.videos.previous.unshift(room.videos.current);
      if(room.videos.upcoming.length > 0) {
        room.videos.current = room.videos.upcoming.shift();
        room.io.to(room.id).emit('playVideo',
          {videos: room.videos});
      } else {
        room.videos.current = null;
        submitVideo({videoId: previousId, type: 'rec'});
      }
    }
  }
}
