import React, { useState } from "react";
import "./videosection.scss";
import { ContentWrapper, Img, VideoPopup } from "../../../components";
import { PlayIcon } from "../PlayBtn";

const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="sk-item">
        <div className="thum skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videos-section">
      <ContentWrapper>
        <div className="section-heading">Official Videos</div>

        {!loading ? (
          <div className="videos">
            {data?.results?.map((video) => (
              <div
                key={video?.id}
                className="video-item"
                onClick={() => {
                  setVideoId(video?.key);
                  setShow(true);
                }}
              >
                <div className="video-thumbnail">
                  <Img
                    src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className="video-title">{video?.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="video-skeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>

      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
