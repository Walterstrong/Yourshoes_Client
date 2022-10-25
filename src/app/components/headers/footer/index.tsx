import {
  Box,
  Button,
  IconButton,
  Container,
  Stack,
  Badge,
} from "@mui/material";
import React from "react";

export function Footer() {
  return (
    <div className="footer_config">
      <Container>
        <Stack className="main_footer_container">
          <Stack flexDirection={"row"} style={{ height: "242px" }}>
            <Stack className="info" flexDirection={"column"}>
              <Box>
                <img src="/icons/Papay.svg" />
              </Box>
              <Box className="main_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor Sed ut perspiciatis unde omnis iste{" "}
              </Box>
              <Stack className="contact_links">
                <Box>
                  <img src="/icons/Group 186.svg" />
                </Box>
                <Box>
                  <img src="/icons/Group 187.svg" />
                </Box>
                <Box>
                  <img src="/icons/Group 188.svg" />
                </Box>
                <Box>
                  <img src="/icons/Group 189.svg" />
                </Box>
              </Stack>
            </Stack>
            <Stack className="parts">
              <Box className="part_subject">Bo'limlar</Box>
              <Box className="divider"></Box>
              <Box className="targets">
                Bosh Sahifa Oshxonalar Jamiyat Yordam
              </Box>
            </Stack>
            <Stack></Stack>
          </Stack>

          <Box className="liner"></Box>
          <Box className="copyrights">
            Copyright Papays 2022, All riht reserved.
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
