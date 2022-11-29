import React, { useEffect } from "react";

import "../../../css/home.css";
import { Advertisements } from "./advertisements";
import { BestDishes } from "./bestdishes";
import { BestRestaurants } from "./bestrestaurants";
import { Events } from "./events";
import { Recommendations } from "./recommendations";
import { Statistics } from "./statistics";
import { TopRestaurants } from "./toprestaurants";

export function HomePage() {
  useEffect(() => {
    console.log("componentDidMount=>Data fetchCount");
    return () => {
      console.log("componentWillUnmount process");
    };
  }, []);
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
