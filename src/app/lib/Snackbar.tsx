import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { SnackbarContent } from "@mui/material";

export function Snackbars(props: any) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.handleClickOpenSnackbar}
        onClose={props.handleCloseOpenSnackbar}
      >
        <SnackbarContent
          style={{ width: "200px", height: "100px", marginTop: "20px" }}
          message="I love snacks"
          onClick={props.handleCloseOpenSnackbar}
        />
      </Snackbar>
    </div>
  );
}
