import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function NavbarHome() {
  return (
    <div className="home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <Box>
            <img src="/icons/papay.svg" />
          </Box>
          <Stack
            flexDirection={"row"}
            justifyContent="space-evenly"
            alignItems={"center"}
            className="navbar_links"
          >
            <Box className="hover-line">
              <NavLink to="/" activeClassName="underline">
                Bosh Sahifa
              </NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/restaurant" activeClassName="underline">
                Restaurant
              </NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/orders" activeClassName="underline">
                Buyurtma
              </NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/community" activeClassName="underline">
                Jamiyat
              </NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Yordam
              </NavLink>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
