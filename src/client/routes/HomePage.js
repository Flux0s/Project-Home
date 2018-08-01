import React, { Component } from "react";
import { MDCRipple } from "@material/ripple";

class HomePage extends Component {
  static docTitle = "Json Home Config";

  constructor(props) {
    super(props);
    this.state = {};
    document.title = HomePage.docTitle;
  }

  componentDidMount() {
    new MDCRipple(document.querySelector(".config-logout"));
  }

  render() {
    var socket = this.props.socket;
    return (
      <button
        onClick={() => {
          socket.emit("Log_Out", () => this.props.logout);
        }}
        className="config-logout mdc-button mdc-button--raised"
      >
        Log Out
      </button>
    );
  }
}

export default HomePage;
