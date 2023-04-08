import { Container } from "@mui/material";
import React from "react";

export function Advertisements() {
  return (
    <div className="ads_restaurant_frame">
      <video
        className={"ads_video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source
          data-src="https://www.youtube.com/watch?v=XzKmrMHEi6M"
          type="video/mp4"
          src="https://www.youtube.com/watch?v=XzKmrMHEi6M"
        />
      </video>
    </div>
  );
}
