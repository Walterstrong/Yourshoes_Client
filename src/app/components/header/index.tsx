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
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  sweetTopSuccessAlert,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import Basket from "./basket";

export function NavbarHome(props: any) {
  //**INITIALIZATIONSS**/

  return (
    <div className="format home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <NavLink to="/">
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
              <NavLink to="/restaurant" activeClassName="underline">
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

        {/* <Stack className="head_information" justifyContent={"row"}>
          <Stack
            justifyContent={"column"}
            style={{ marginTop: "86px", marginLeft: "24px" }}
          >
            <Box>
              <img src="/icons/wellcome.svg" />
            </Box>
            <Box className="define_restaurant">
              The Authentic Restaurant & Cafe
            </Box>
            <Box className="timeline_service">24 soat xizmatingizdamiz.</Box>
            <Box sx={{ mt: "90px" }}>
              {!verifiedMemberData ? (
                <Button
                  variant="contained"
                  style={{
                    width: "210px",
                    height: "60px",
                    background: "#1976d2",
                    color: "#FFFFFF",
                  }}
                  onClick={props.handleSignUpOpen}
                >
                  RO’YHATDAN O’TISH
                </Button>
              ) : null}
            </Box>
          </Stack>
          <Box className="big_img"></Box>
        </Stack> */}
      </Container>
    </div>
  );
}
