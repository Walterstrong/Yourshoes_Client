import { Container } from "@mui/material";
import React from "react";
import { useState } from "react";
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
        controls
      >
        <source src="/SHOES - 3D Commercial.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
