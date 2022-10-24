import React from "react";
import "../css/App.css";
import "../css/navbar.css";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { RestaurantPage } from "./screens/RestaurantPage";
import { CommunityPage } from "./screens/CommunityPage";
import { MemberPage } from "./screens/MemberPage";
import { OrdersPage } from "./screens/OrdersPage";
import { HelpPage } from "./screens/HelpPage";
import { LoginPage } from "./screens/LoginPage";
import { HomePage } from "./screens/HomePage";
import { NavbarHome } from "./components/headers";
import { NavbarRestaurant } from "./components/headers/restaurant";
import { NavbarOthers } from "./components/headers/others";

function App() {
  const main_path = window.location.pathname;
  return (
    <Router>
      {main_path === "/" ? (
        <NavbarHome />
      ) : main_path.includes("/restaurant") ? (
        <NavbarRestaurant />
      ) : (
        <NavbarOthers />
      )}

      {/* <nav>
        <ul>
          <li>
            <Link to="/restaurant">RestaurantPage</Link>
          </li>
          <li>
            <Link to="/community">CommunityPage</Link>
          </li>
          <li>
            <Link to="/orders">OrdersPage</Link>
          </li>
          <li>
            <Link to="/member-page">MemberPage</Link>
          </li>
          <li>
            <Link to="/help">HelpPage</Link>
          </li>
          <li>
            <Link to="/login">LoginPage</Link>
          </li>
          <li>
            <Link to="/">HomePage</Link>
          </li>
        </ul>
      </nav> */}
      <Switch>
        <Route path="/restaurant">
          <RestaurantPage />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
