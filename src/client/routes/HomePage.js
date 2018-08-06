import React, { Component } from "react";
import { MDCRipple } from "@material/ripple";
import Socket from "../Components/Socket";
import { withRouter } from "react-router-dom";

class HomePage extends Component {
  static docTitle = "Json Home Config";

  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(true).getSocket()
    };
    document.title = HomePage.docTitle;
  }

  componentDidMount() {
    new MDCRipple(document.querySelector(".config-logout"));
  }

  render() {
    return <this.LogoutButton />;
  }

  LogoutButton = withRouter(({ history }) => (
    <button
      onClick={() => {
        console.log("Sending Logout request...");
        this.state.socket.emit("Log_Out", () => {
          console.log("Logout callback invoked!");
          this.props.logout(() => history.push("/"));
        });
      }}
      className="mdc-button mdc-button--raised config-logout"
    >
      Log Out
    </button>
  ));
}

export default HomePage;
