import outgoingActions from './outgoingActions';
import dataStore from '../dataStore';
import {helpMessage, aboutMessage, usersMessage, mutedMessage} from '../staticMessages';

export default function messageActionParser(data) {
  const msg = data.msg;
  const skipRX = /^\/skip/i;
  const helpRX = /^\/help/i;
  const aboutRX = /^\/about/i;
  const recRX = /^\/r/i;
  const roomsRX = /^\/rooms/i;
  const usersRX = /^\/users/i;
  const muteRX = /^\/mute/i;
  const unmuteRX = /^\/unmute/i;
  const clearRX = /^\/clear/i;
  const aliasRX = /^\/alias\s([^(\s|\b)]*)/i;
  const joinRX = /^\/join\s([^(\s|\b)]*)/i;
  const submitRX = /^\/s\s([^(\b)]*)/i;
  const undoRX = /^\/u/i;
  const youtubeRX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  let aliasMatch = msg.match(aliasRX);
  let joinMatch = msg.match(joinRX);
  let submitMatch = msg.match(submitRX);

  if(submitMatch) {
    let videoMatch = submitMatch[1];
    let videoURLTest = videoMatch.match(youtubeRX);
    if(videoURLTest) {
      outgoingActions.submitVideo({videoId: videoURLTest[1], type: 'url'});
    } else {
      outgoingActions.submitVideo({search: videoMatch, type: 'search'});
    }
    return false;
  }
  if(aliasMatch) {
    outgoingActions.updateAlias({alias: aliasMatch[1]});
    return false;
  }
  if(joinMatch) {
    window.location = '/r/' + joinMatch[1];
    return false;
  }
  if(undoRX.test(msg)) {
    outgoingActions.undoSubmit();
    return false;
  }
  if(skipRX.test(msg)) {
    dataStore.setVideoTimeSilent({videoTime: 0});
    outgoingActions.skipVideo();
    return false;
  }
  if(roomsRX.test(msg)) {
    outgoingActions.rooms();
    return false;
  }
  if(usersRX.test(msg)) {
    usersMessage(dataStore.getData());
    return false;
  }
  if(muteRX.test(msg)) {
    let m = {muted: true};
    dataStore.setMuted(m);
    mutedMessage(m);
    return false;
  }
  if(unmuteRX.test(msg)) {
    let m = {muted: false};
    dataStore.setMuted(m);
    mutedMessage(m);
    return false;
  }
  if(aboutRX.test(msg)) {
    aboutMessage();
    return false;
  }
  if(recRX.test(msg)) {
    var data = dataStore.getData();
    var videoId = '';
    if(data.videos.current !== null) {
      videoId = data.videos.current.id;
      outgoingActions.submitVideo({videoId: videoId, type: 'rec'});
    }
    return false;
  }
  if(recRX.test(msg)) {
    var data = dataStore.getData();
    var videoId = '';
    if(data.videos.current !== null) {
      videoId = data.videos.current.id;
      outgoingActions.submitVideo({videoId: videoId, type: 'recb'});
    }
    return false;
  }
  if(helpRX.test(msg)) {
    helpMessage();
    return false;
  }
  if(clearRX.test(msg)) {
    dataStore.clearMessages();
    return false;
  }
  return true;
}
