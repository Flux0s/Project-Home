import React, { Component } from "react";
import { Progress } from "antd";

const UPDATE_DELTA = 1;
const CLOSE_TIMEOUT = 1 * 1000;
const COMPLETE = 100;

const loadingInterval = null;

export default class ProgressBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      progress :0
    }
  }

  render() {
    return (
      <Progress percent={this.state.progress}/>
    );
  }

  StartLoading() {
    loadingInterval = setInterval(() => {
      this.setState({ progress: progress + UPDATE_DELTA });
      if (this.state.progress >= COMPLETE) clearInterval(loadingInterval);
    }, LOAD_TIMEOUT / UPDATE_DELTA);
  }

  LoadComplete() {
    clearInterval(loadingInterval);
    this.setState({progress: COMPLETE});
  }
}

export default ProgressBar;