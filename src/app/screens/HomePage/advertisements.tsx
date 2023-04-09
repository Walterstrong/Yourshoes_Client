import { Container } from "@mui/material";
import React from "react";
import { useState } from "react";
export function Advertisements() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoSources = [
    {
      src: "/SHOES - 3D Commercial.mp4",
      type: "video/mp4",
    },
    {
      src: "/Shoe 3D animation.mp4",
      type: "video/mp4",
    },
    {
      src: "Shoe Advertisement Animation Video.mp4",
      type: "video/mp4",
    },
    {
      src: "Shoes Product Animation.mp4",
      type: "video/mp4",
    },
  ];

  const handleVideoEnded = () => {
    const nextVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    setCurrentVideoIndex(nextVideoIndex);
  };
  const currentVideo = videoSources[currentVideoIndex];

  return (
    <div className="ads_restaurant_frame">
      <video
        className={"ads_video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
        controls
        onEnded={handleVideoEnded}
      >
        <source src={currentVideo.src} type={currentVideo.type} />
      </video>
    </div>
  );
}
