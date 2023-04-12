import React, { useState, useEffect } from "react";
import "../../../css/home.css";
import { Advertisements } from "./advertisements";

import { BestProducts } from "./bestProducts";
import { Events } from "./events";
// import { Recommendations } from "./recommendations";
import { NewProducts } from "./newProducts";

// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setRandomRestaurants, setBestProducts } from "./slice";
import { Restaurant } from "../../../types/user";
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { RandomRestaurants } from "./randomRestaurants";
import { Product } from "types/product";
import { ProductSearch, ProductSearchObj } from "types/others";
import { CommunityChats } from "../../components/chatting/communityChats";
import { Recommendations } from "./recommendations";

// REDUX SLICE
// bu yerda Restaurant[] nomli datani setTopRestaurantsga yuborilayabdi,

const actionDispatch = (dispatch: Dispatch) => ({
  setRandomRestaurants: (data: Restaurant[]) =>
    dispatch(setRandomRestaurants(data)),
});

export function HomePage(props: any) {
  // ** INITIALIZATIONS *
  const { setRandomRestaurants } = actionDispatch(useDispatch());

  const [targetProductSearchObj, setTargetProductsSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 25,
      order: "createdAt",
      restaurant_mb_id: "all",
      product_collection: "all",
      product_size: "all",
      product_color: "all",
      product_type: "all",
    });

  const [targetProduct, setTargetProduct] = useState<ProductSearch>({
    page: 1,
    limit: 25,
    order: "product_likes",
    restaurant_mb_id: "all",
    product_collection: "all",
    product_size: "all",
    product_color: "all",
    product_type: "all",
  });

  useEffect(() => {
    // backend data request
    const productApiService = new ProductApiService();
    productApiService
      .getTargetProducts(targetProduct)
      .then((data) => {
        setBestProducts(data);
      })
      .catch((err) => console.log(err));

    const restaurantApiService = new RestaurantApiService();
    restaurantApiService
      .getRestaurants({
        page: 1,
        limit: 10,
        order: "random",
      })
      .then((data) => setRandomRestaurants(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homepage">
      <RandomRestaurants />
      <Advertisements />
      <NewProducts onAdd={props.onAdd} />
      <BestProducts onAdd={props.onAdd} />
      <Events />
      <Recommendations />
    </div>
  );
}
