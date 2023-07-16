import React from "react";
import "./videopopup.scss";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(videoId);
  };

  return (
    <div className={`video-popup ${show ? "visible" : ""}`}>
      <div className="opacity-layer" onClick={hidePopup} />
      <div className="video-player">
        <span className="close-btn" onClick={hidePopup}>
          Close
        </span>

        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default VideoPopup;
