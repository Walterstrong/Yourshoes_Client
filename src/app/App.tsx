import React from "react";
import "../css/App.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";

function App() {
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component={"h1"}>
            Create React App on TypeScript with REDUX
          </Typography>
        </Box>
        <Box>
          <RippleBadge badgeContent={4}>
            <Button color="secondary" variant="contained">
              Contained
            </Button>
          </RippleBadge>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
