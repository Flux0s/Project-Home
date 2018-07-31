import React, { Component } from "react";
import Socket from "./Components/socket";

class ConfigPage extends Component {
  static docTitle = "Json Home Config";

  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(true).getSocket()
    };
    document.title = ConfigPage.docTitle;
  }
  render() {
    var socket = this.state.socket;
    return (
      <button
        onClick={() => {
          socket.emit("Log_Out");
          this.props.logout();
        }}
        className="config-logout mdc-button mdc-button--raised"
      >
        Log Out
      </button>
    );
  }
}

export default ConfigPage;
