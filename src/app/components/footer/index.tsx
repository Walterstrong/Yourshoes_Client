import { Box, Container, Stack } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
export function Footer() {
  return (
    <div className="footer_config">
      <Container>
        <Stack className="main_footer_container">
          <Stack flexDirection={"row"}>
            <Stack className="info" flexDirection={"column"}>
              <Box className="info_box">
                <h4>Our Platform</h4>
                <ul>
                  <li>
                    <a href="#">about us</a>
                  </li>
                  <li>
                    <a href="#">our services</a>
                  </li>
                  <li>
                    <a href="#">privacy policy</a>
                  </li>
                  <li>
                    <a href="#">affiliate program</a>
                  </li>
                </ul>
              </Box>
            </Stack>
            <Stack className="info">
              <Box className="info_box">
                <h4>Getting help</h4>
                <ul>
                  <li>
                    <a href="#">shipping</a>
                  </li>
                  <li>
                    <a href="#">returns</a>
                  </li>
                  <li>
                    <a href="#">order status</a>
                  </li>
                  <li>
                    <a href="#">payment options</a>
                  </li>
                </ul>
              </Box>
            </Stack>
            <Stack className="info">
              <Box className="info_box">
                <h4>On Social media</h4>
                <ul>
                  <li>
                    <a>Facebook</a>
                  </li>
                  <li>
                    <a>Twitter</a>
                  </li>
                  <li>
                    <a>Instagram</a>
                  </li>
                  <li>
                    <a>Telegram</a>
                  </li>
                </ul>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
