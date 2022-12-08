import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ChosenDish } from "./chosenDish";
import { OneRestaurant } from "./oneRestaurant";
import { AllRestaurants } from "./allRestaurants";
import "../../../css/restaurant.css";

export function RestaurantPage(props: any) {
  let restaurant = useRouteMatch();

  return (
    <div className="restaurant_page">
      <Switch>
        <Route path={`${restaurant.path}/dish/:dish_id`}>
          <ChosenDish onAdd={props.onAdd} />
        </Route>
        <Route path={`${restaurant.path}/:restaurant_id`}>
          <OneRestaurant onAdd={props.onAdd} />
        </Route>
        <Route path={`${restaurant.path}`}>
          <AllRestaurants />
        </Route>
      </Switch>
    </div>
  );
}
