import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ChosenDish } from "./chosenDish";
import { OneRestaurant } from "./oneRestaurant";
import { AllRestaurants } from "./allRestaurants";

export function RestaurantPage() {
  let restaurant = useRouteMatch();

  return (
    <div className="event_frame">
      <Switch>
        <Route path={`${restaurant.path}/dish/:dish_id`}>
          <ChosenDish />
        </Route>
        <Route path={`${restaurant.path}/:restaurant_id`}>
          <OneRestaurant />
        </Route>
        <Route path={`${restaurant.path}`}>
          <AllRestaurants />
        </Route>
      </Switch>
    </div>
  );
}
