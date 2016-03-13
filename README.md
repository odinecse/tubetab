# tunetab
A classy youtube with friends "app". Submit videos, chat, skip ones you don't like.

Check it out in the wild here: [tunetab.us](http://tunetab.us/).

Uses node.js, socket.io and react with babel and webpack. Exercise in writing "clean" react code.

### install/run
* `cp config.sample.js config.js` this is gitignored, you need to get a youtube api key and google analytics id
* `npm install` dependencies
* `npm start` starts server
* `npm run build` dev build, watches files for changes
* `npm run build-prod` prod build with some minification and stuff

### NOTES
- broken
  - [ ] add /bug to send to ga
  - [x] what to do when playing non-ebedable video...
  - [x] undefineds on restart if client reestablishes connection after disconnect and serevr restart
  - [ ] need to revisit potential other runaway processes
  - [x] varibales like votes and videotime not being properly rest on nextvideo/skip
  - [x] wrap long titles in previous upcoming with elipsese
  - [x] on alias update, push out userinfo update action from server to client
  - [x] new rec seems to always skip video on video end twice?
    - [x] make sure skipping can only happen once per current video...
  - [x] users call is broken about current user, just take that out
  - [ ] only works when tab in focus and running adblock, lol?
  - [ ] losing socket connection, waht to do
    - [ ] skipping after a pause?
    - [ ] pausing breaks everthing
- deploy
  - [ ] `sudo apt-get install build-essential g++`
  - [ ] `iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000`
- submit
  - [ ] remove from upcoming
  - [ ] re-submit
  - [x] more advanced version would return a few results you can pick through
  - [ ] broad recommendation `/recb` should take random item form history and do a rec based off that...
  - [x] submit now playing submitted by so and so announcememnt
  - [x] notify who skipping
  - [x] notify room on successful recommendation
    - [x] flash upcoming playlists
  - [x] NO DUPLICATES! - keep a history of videos, dont recommend videos already played, incrememnet rec count, increase rec count...
  - [x] submit by search of youtube api
  - [x] undo last submit
    - [x] take undo submits out of history too
      - [x] maybe it shouldn't?
  - [x] recommend videos off current video
- rooms
  - [x] keep rooms alive for 3 days after last user
  - [ ] have way of autorunning rooms? server side browser?
  - [ ] clone command to new room takes all upcoming tracks and moves them
  - [x] list global rooms
  - [x] join them
  - [x] list current users on login
  - [ ] vote count on vote
- general
  - [ ] redo css with flexbox and BEM
  - [ ] reset room
  - [ ] update title with current video
  - [x] chat notification sound?
  - [ ] make into private app, only room creator can skip, etc?
  - [ ] better deploy
  - [ ] tests
  - [ ] play around with redux for datastore
  - [ ] make into private app, only room creator can skip, etc... ?
  - [ ] save videos you like, export those in json?
  - [x] auto play next functionality for music exploration...
  - [x] add about
  - [x] mute command
  - [ ] more fun commands
  - [ ] refocus input on click in chat bar
  - [ ] live reloading for react and css
  - [ ] store room states in db?
