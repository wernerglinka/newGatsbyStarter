/* global window, document, YT */
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ModalVideo = ({ videoID }) => {
  let youTubeTarget = useRef();
  let player;

  const onPlayerStateChange = function(event) {
    // player states
    // "unstarted"               = -1
    // YT.PlayerState.ENDED      =  0
    // YT.PlayerState.PLAYING    =  1
    // YT.PlayerState.PAUSED     =  2
    // YT.PlayerState.BUFFERING  =  3
    // YT.PlayerState.CUED       =  5

    switch (event.data) {
      case YT.PlayerState.PAUSED:
        break;

      case YT.PlayerState.PLAYING:
        break;

      case YT.PlayerState.ENDED:
        closeModal();
        break;

      case YT.PlayerState.CUED:
        break;

      default:
    }
  };

  const playVideo = () => player.playVideo();

  // reference https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
  const playerVars = {
    autoplay: 0,
    // start: startTime || null, // if no start or end time is specified go trom 0 to end
    // end: endTime || null, // start/stop via js commands
    controls: 0, // show video controls
    enablejsapi: 1, // enable the js api so we can control then player with js
    wmode: "opaque", // allow other elements to cover video, e.g. dropdowns or pop-ups
    origin: window.location.origin, // prevent "Failed to execute 'postMessage' on 'DOMWindow'" error
    rel: 0, // disable other video suggestions after video end
  };

  function getPlayer(YT) {
    player = new YT.Player(youTubeTarget, {
      videoId: videoID,
      playerVars,
      events: {
        onReady: playVideo,
        onStateChange: onPlayerStateChange,
      },
    });
    return player;
  }

  useEffect(() => {
    // if the YouTube iFrame API isn't loaded yet, we do it here
    if (!window.YT) {
      // load the youTube video JS api
      // https://developers.google.com/youtube/iframe_api_reference
      // This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      // use a promise to manage the async onYouTubeIframeAPIReady function
      new Promise(resolve => {
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      }).then(YT => getPlayer(YT));
    } else {
      // the YT object already exists so we just get a player
      getPlayer(YT);
    }
  }, []); // this only runs once as the empty array never changes

  return (
    <VideoWrapper>
        <div ref={e => { youTubeTarget = e }} /> {/* eslint-disable-line */}
    </VideoWrapper>
  );
};

ModalVideo.propTypes = {
  videoID: PropTypes.string.isRequired,
};

export default ModalVideo;
