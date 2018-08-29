import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Authentication from "./Authentication";

const UPDATE_DELTA = 2;
const CLOSE_TIMEOUT = 1 * 1000;
const LOAD_TIMEOUT = Authentication.timeOut;

const COMPLETE = 100;

const styles = (theme) => ({
  progress: {
    position: "absolute",
    width: "100%",
    "z-index": "1",
    transition: "height 0.15s ease-out"
  }
});

class ProgressBar extends Component {
  loadingInterval = null;
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    };
  }
  componentWillMount() {
    this.StartLoading();
  }
  render() {
    const { classes } = this.props;
    return (
      <LinearProgress
        className={classes.progress}
        variant="determinate"
        value={this.state.progress}
      />
    );
  }

  StartLoading() {
    // window.console.log("Starting Progress load...");
    this.loadingInterval = setInterval(() => {
      if (this.props.loaded) {
        this.LoadComplete();
      } else {
        this.setState({ progress: this.state.progress + UPDATE_DELTA });
        if (this.state.progress >= COMPLETE)
          clearInterval(this.loadingInterval);
      }
    }, (LOAD_TIMEOUT / COMPLETE) * UPDATE_DELTA);
  }

  LoadComplete() {
    clearInterval(this.loadingInterval);
    this.setState({ progress: COMPLETE });
    this.Close();
  }

  Close() {
    setTimeout(() => {
      styles.progress = {
        ...styles,
        height: 0
      };
    }, CLOSE_TIMEOUT);
  }
}

export default withStyles(styles)(ProgressBar);
