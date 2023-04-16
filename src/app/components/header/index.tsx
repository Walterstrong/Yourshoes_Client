import { Logout } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Menu,
  MenuItem,
  ListItem,
} from "@mui/material";
import { verifiedMemberData } from "app/apiServices/verify";
import useDeviceDetect from "app/lib/responsive/useDeviceDetect";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  sweetTopSuccessAlert,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import Basket from "./basket";
import { useHistory } from "react-router-dom";
import { History } from "history";
export function NavbarHome(props: any) {
  //**INITIALIZATIONSS**/
  const history = useHistory<History>();
  const { isMobile } = useDeviceDetect();
  const handlePushConstruction = () => {
    history.push("/construction");
    props.setPath();
  };

  if (isMobile()) {
    return (
      <div className="format home_navbar">
        <Container>
          <Stack
            flexDirection={"row"}
            className="navbar_config"
            justifyContent={"space-between"}
          >
            <NavLink to={"/construction"} onClick={props.setPath}>
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  cursor: "pointer",
                  // borderRadius: "24px",
                }}
                src="/icons/yourshoes.png"
              />
            </NavLink>
            <Stack
              flexDirection={"row"}
              justifyContent="space-between"
              alignItems={"center"}
              className="navbar_links"
            >
              <Box className="hover-line">
                <NavLink to="/construction" onClick={props.setPath}>
                  Home
                </NavLink>
              </Box>
              <Box className="hover-line">
                <NavLink to="/construction" onClick={props.setPath}>
                  Shop
                </NavLink>
              </Box>
              {verifiedMemberData ? (
                <Box
                  className="hover-line"
                  onClick={props.handleClickOpenAlert}
                >
                  <NavLink to="/orders" activeClassName="underline">
                    Order
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line">
                <NavLink to="/construction" onClick={props.setPath}>
                  Community
                </NavLink>
              </Box>
              {verifiedMemberData ? (
                <Box
                  className="hover-line"
                  onClick={props.handleClickOpenAlert}
                >
                  <NavLink to="/member-page" activeClassName="underline">
                    My page
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line">
                <NavLink to="/construction" onClick={props.setPath}>
                  Help
                </NavLink>
              </Box>

              <Box>
                {!verifiedMemberData ? (
                  <NavLink to="/construction" onClick={props.setPath}>
                    <Button
                      className="loginBtn"
                      variant="contained"
                      style={{ color: "#FFFFFF", background: "#755BB4" }}
                    >
                      Login
                    </Button>
                  </NavLink>
                ) : (
                  <img
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "24px",
                    }}
                    src={verifiedMemberData.mb_image}
                    onClick={props.handleLogOutClick}
                  />
                )}
                <Menu
                  anchorEl={props.anchorEl}
                  open={props.open}
                  onClose={props.handleCloseLogOut}
                  onClick={props.handleCloseLogOut}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32)",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '"',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={props.handleLogOutRequest}>
                    <ListItem>
                      <Logout
                        fontSize="small"
                        style={{ color: "#FFFFFF", background: "#755BB4" }}
                      />
                      Logout
                    </ListItem>
                  </MenuItem>
                </Menu>
              </Box>
              <Box>
                {!verifiedMemberData ? (
                  <NavLink to="/construction" onClick={props.setPath}>
                    <Button
                      className="loginBtn"
                      variant="contained"
                      style={{ color: "#FFFFFF", background: "#755BB4" }}
                    >
                      Sign Up
                    </Button>
                  </NavLink>
                ) : null}
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="format home_navbar">
        <Container>
          <Stack
            flexDirection={"row"}
            className="navbar_config"
            justifyContent={"space-between"}
          >
            <NavLink to="/" onClick={props.setPath}>
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  cursor: "pointer",
                  // borderRadius: "24px",
                }}
                src="/icons/yourshoes.png"
              />
            </NavLink>
            <Stack
              flexDirection={"row"}
              justifyContent="space-between"
              alignItems={"center"}
              className="navbar_links"
            >
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/" activeClassName="underline">
                  Home
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/shop" activeClassName="underline">
                  Shop
                </NavLink>
              </Box>
              {verifiedMemberData ? (
                <Box className="hover-line" onClick={props.setPath}>
                  <NavLink to="/orders" activeClassName="underline">
                    Order
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/community" activeClassName="underline">
                  Community
                </NavLink>
              </Box>
              {verifiedMemberData ? (
                <Box className="hover-line" onClick={props.setPath}>
                  <NavLink to="/member-page" activeClassName="underline">
                    My page
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/help" activeClassName="underline">
                  Help
                </NavLink>
              </Box>

              <Basket
                cartItems={props.cartItems}
                onAdd={props.onAdd}
                onRemove={props.onRemove}
                onDelete={props.onDelete}
                onDeleteAll={props.onDeleteAll}
                setOrderRebuild={props.setOrderRebuild}
              />
              <Box>
                {!verifiedMemberData ? (
                  <Button
                    className="loginBtn"
                    variant="contained"
                    style={{ color: "#FFFFFF", background: "#755BB4" }}
                    onClick={props.handleLoginOpen}
                  >
                    Login
                  </Button>
                ) : (
                  <img
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "24px",
                    }}
                    src={verifiedMemberData.mb_image}
                    onClick={props.handleLogOutClick}
                  />
                )}
                <Menu
                  anchorEl={props.anchorEl}
                  open={props.open}
                  onClose={props.handleCloseLogOut}
                  onClick={props.handleCloseLogOut}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32)",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '"',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={props.handleLogOutRequest}>
                    <ListItem>
                      <Logout
                        fontSize="small"
                        style={{ color: "#FFFFFF", background: "#755BB4" }}
                      />
                      Logout
                    </ListItem>
                  </MenuItem>
                </Menu>
              </Box>
              <Box>
                {!verifiedMemberData ? (
                  <Button
                    className="loginBtn"
                    variant="contained"
                    style={{ color: "#FFFFFF", background: "#755BB4" }}
                    onClick={props.handleSignUpOpen}
                  >
                    Sign Up
                  </Button>
                ) : null}
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  }
}
