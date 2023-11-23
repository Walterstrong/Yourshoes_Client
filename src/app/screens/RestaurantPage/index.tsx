import React from "react";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { ChosenDish } from "./chosenDish";
import { OneRestaurant } from "./oneRestaurant";
import { AllRestaurants } from "./allRestaurants";
import "../../../css/restaurant.css";

export function RestaurantPage(props: any) {
  let shop = useRouteMatch();

  return (
    <div className="restaurant_page">
      <Switch>
        <Route path={`${shop.path}/product/:dish_id`}>
          <ChosenDish onAdd={props.onAdd} />
        </Route>
        <Route path={`${shop.path}/:brand_id`}>
          <OneRestaurant onAdd={props.onAdd} />
        </Route>
        <Route path={`${shop.path}`}>
          <AllRestaurants />
        </Route>
      </Switch>
    </div>
  );
}
