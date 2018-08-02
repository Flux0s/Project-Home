import React, { Component } from "react";
import { MDCRipple } from "@material/ripple";
import PropTypes from "prop-types";
import Socket from "../Components/Socket";

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
    var socket = new Socket(true).getSocket();
    return (
      <button
        onClick={() => {
          socket.emit("Log_Out", () => {
            console.log("Logout callback invoked!");
            setTimeout(this.props.logout, 0);
          });
        }}
        className="mdc-button mdc-button--raised config-logout"
      >
        Log Out
      </button>
    );
  }
}

export default HomePage;
