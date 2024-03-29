/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import "../../../css/home.css";
import { Advertisements } from "./advertisements";
import { BestProducts } from "./bestProducts";
import { Events } from "./events";
import { NewProducts } from "./newProducts";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setRandomRestaurants, setBestProducts } from "./slice";
import { Restaurant } from "../../../types/user";
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { RandomRestaurants } from "./randomRestaurants";
import { ProductSearch } from "types/others";
import { Recommendations } from "./recommendations";

const actionDispatch = (dispatch: Dispatch) => ({
  setRandomRestaurants: (data: Restaurant[]) =>
    dispatch(setRandomRestaurants(data)),
});

export function HomePage(props: any) {
  // ** INITIALIZATIONS *
  const { setRandomRestaurants } = actionDispatch(useDispatch());

  useEffect(() => {
    const restaurantApiService = new RestaurantApiService();
    restaurantApiService
      .getRestaurants({
        page: 1,
        limit: 10,
        order: "random",
      })
      .then((data) => setRandomRestaurants(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="homepage">
      <RandomRestaurants
        openAlert={props.openAlert}
        handleClickOpenAlert={props.handleClickOpenAlert}
        handleCloseAlert={props.handleCloseAlert}
      />
      <NewProducts
        onAdd={props.onAdd}
        openAlert={props.openAlert}
        handleClickOpenAlert={props.handleClickOpenAlert}
        handleCloseAlert={props.handleCloseAlert}
      />

      <BestProducts
        onAdd={props.onAdd}
        openAlert={props.openAlert}
        handleClickOpenAlert={props.handleClickOpenAlert}
        handleCloseAlert={props.handleCloseAlert}
      />
      <Advertisements />
      <Events
        openAlert={props.openAlert}
        handleClickOpenAlert={props.handleClickOpenAlert}
        handleCloseAlert={props.handleCloseAlert}
      />
      <Recommendations
        openAlert={props.openAlert}
        handleClickOpenAlert={props.handleClickOpenAlert}
        handleCloseAlert={props.handleCloseAlert}
      />
    </div>
  );
}
