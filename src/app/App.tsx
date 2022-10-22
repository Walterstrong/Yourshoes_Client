import React from "react";
import "../css/App.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users from "./components/users";
import Dishes from "./components/dishes";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dishes">Dishes</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/dishes">
            <Dishes />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Container>
              <Home />
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function Home() {
  return <h2>Home</h2>;
}
