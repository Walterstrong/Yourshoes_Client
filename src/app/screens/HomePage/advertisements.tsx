import { Container } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

export function Advertisements(): React.ReactElement {
  const videos: string[] = ["/videoplayback.mp4"];

  const [videoIndex, setVideoIndex] = useState<number>(
    Math.floor(Math.random() * videos.length)
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [videoIndex]);

  const handleVideoEnded = (): void => {
    setVideoIndex((videoIndex + 1) % videos.length);
  };

  return (
    <div className="ads_restaurant_frame">
      <video
        ref={videoRef}
        className={"ads_video"}
        autoPlay={true}
        loop={false}
        muted
        playsInline
        data-video-media=""
        controls
        onEnded={handleVideoEnded}
      >
        <source src={videos[videoIndex]} type="video/mp4" />
      </video>
    </div>
  );
}
