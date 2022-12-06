import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { RestaurantPage } from "./screens/restaurantpage";
import { CommunityPage } from "./screens/communitypage";
import { OrdersPage } from "./screens/orderspage";
import { MemberPage } from "./screens/memberpage";
import { HelpPage } from "./screens/helppage";
import { LoginPage } from "./screens/loginpage";
import { Footer } from "./components/footer";
import { NavbarHome } from "./components/header";
import { NavbarRestaurant } from "./components/header/restaurant";
import { NavbarOthers } from "./components/header/others";
import { HomePage } from "./screens/homepage";
import AuthenticationModal from "./components/auth";
import { Member } from "../types/user";
import { serverApi } from "./lib/config";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "./lib/sweetAlert";
import { Definer } from "./lib/Definer";
import MemberApiService from "./apiServices/memberApiService";
import { verifiedMemberData } from "./apiServices/verify";
import Cookie from "universal-cookie";

function App() {
  //** INITIALIZATIONS *
  const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(
    null
  );
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const memberDataJson: any = localStorage.getItem("member_data")
      ? localStorage.getItem("member_data")
      : null;
    const member_data = memberDataJson ? JSON.parse(memberDataJson) : null;
    if (member_data) {
      member_data.mb_image = member_data.mb_image
        ? `${serverApi}/${member_data.mb_image}`
        : "/auth/default_user.svg";
      setVerifiedMemberData(member_data);
    }
  }, [signUpOpen, loginOpen]);

  //** HANDLERS */
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogOutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleLogOutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      localStorage.removeItem("member_data");
      await sweetTopSmallSuccessAlert("success", 700, true);
    } catch (err: any) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          verifiedMemberData={verifiedMemberData}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          anchorEl={anchorEl}
          open={open}
          handleLogOutRequest={handleLogOutRequest}
        />
      ) : main_path.includes("/restaurant") ? (
        <NavbarRestaurant
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          verifiedMemberData={verifiedMemberData}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          anchorEl={anchorEl}
          open={open}
          handleLogOutRequest={handleLogOutRequest}
        />
      ) : (
        <NavbarOthers
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          verifiedMemberData={verifiedMemberData}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          anchorEl={anchorEl}
          open={open}
          handleLogOutRequest={handleLogOutRequest}
        />
      )}
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
          {/* <Car /> */}
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
        signUpOpen={signUpOpen}
        handleSignUpOpen={handleSignUpOpen}
        handleSignUpClose={handleSignUpClose}
      />
    </Router>
  );
}

export default App;
