import React, { useEffect } from "react";
import "../../../css/home.css";
import { Advertisements } from "./advertisements";
import { BestDishes } from "./bestdishes";
import { BestRestaurants } from "./bestrestaurants";
import { Events } from "./events";
import { Recommendations } from "./recommendations";
import { Statistics } from "./statistics";
import { TopRestaurants } from "./toprestaurants";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopRestaurants } from "../../screens/homepage/slice";
import { retrieveTopRestaurants } from "./selector";
import { Restaurant } from "../../../types/user";

// REDUC SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data)),
});

// REDUX SELECTOR
const topRestaurantsRetriever = createSelector(
  retrieveTopRestaurants,
  (topRestaurants) => ({
    topRestaurants,
  })
);

export function HomePage() {
  // ** INITIALIZATION *
  const { setTopRestaurants } = actionDispatch(useDispatch());
  const topRestaurants = useSelector(topRestaurantsRetriever);
  //selector: store=>data

  useEffect(() => {
    // backend data request =>data

    setTopRestaurants([]);
    // slice: data => store
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
