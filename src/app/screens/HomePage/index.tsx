import React from "react";
import { Container } from "@mui/material";
import { Statistics } from "./statistics";
import { BestDishes } from "./bestDishes";
import { Advertisements } from "./advertisements";
import { Recommendations } from "./recommendations";
import { Events } from "./events";
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";
import "../../../css/home.css";

export function HomePage() {
  return (
    <div className="homepage">
      <Statistics />
      <TopRestaurants />
      <BestRestaurants />
      <BestDishes />
      <Advertisements />
      <Events />
      <Recommendations />
    </div>
  );
}
