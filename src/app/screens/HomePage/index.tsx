import React, { useEffect } from "react";
import { Statistics } from "./statistics";
import { TopRestaurants } from "./toprestaurants";
import { BestRestaurants } from "./bestrestaurants";
import { BestDishes } from "./bestdishes";
import { Advertisements } from "./advertisements";
import { Events } from "./events";
import { Recommendations } from "./recommendations";
import "../../../css/home.css";

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
