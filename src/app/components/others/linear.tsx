import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    width: "85%",
  },
  progressBar: {
    // Move display: "flex" back to progressBar class
    // Move flexDirection: "row" back to progressBar class
    flexGrow: 1,
    marginRight: 10,
  },
  progressValue1: {
    fontSize: 14,
    marginLeft: 5,
    marginTop: 5,
  },
  progressValue2: {
    fontSize: 14,
    marginLeft: 255,
    marginTop: -40,
    marginBottom: 15,
  },
  customColor: {
    backgroundColor: "lightgray",
    height: 25,
    borderRadius: 8,
    marginLeft: 50,
    marginTop: -20,
    marginBottom: 15,
  },
  customBarColor: {
    backgroundColor: "#ffa726",
  },
});

interface ProgressBarProps {
  value: number;
  value2: number; // Add value2 to the interface
}

export default function ProgressBar({ value, value2 }: ProgressBarProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.progressBar}>
        <div className={classes.progressValue1}>{`${value2} star`}</div>
        <LinearProgress
          classes={{
            root: classes.customColor,
            bar: classes.customBarColor,
          }}
          variant="determinate"
          value={value}
        />
        <div className={classes.progressValue2}>{`${value}%`}</div>
      </div>
    </div>
  );
}
