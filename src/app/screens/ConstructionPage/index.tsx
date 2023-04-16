import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import useDeviceDetect from "app/lib/responsive/useDeviceDetect";
import { NavLink } from "react-router-dom";

export function Construction(props: any) {
  const { isMobile } = useDeviceDetect();

  if (isMobile()) {
    return (
      <div className="construction_frame ">
        <Container>
          <Stack className="mobile">
            <Stack className={"mobile_user_box"}>
              <Stack>
                <Box className="mobile_user_text">
                  MobileVersion is developing!
                </Box>
                <Box className="mobile_user_text">
                  Please use our desktop version!
                </Box>
                <Box className="mobile_user_text">😊 😊 😊</Box>
              </Stack>
              <Stack>
                <NavLink to="/" onClick={props.setPath}>
                  <img
                    style={{
                      width: "200px",
                      height: "200px",
                      cursor: "pointer",
                      // borderRadius: "24px",
                    }}
                    src="/icons/yourshoes.png"
                  />
                </NavLink>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  } else {
    return null;
  }
}
