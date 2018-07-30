import React, { Component } from "react";

class ConfigPage extends Component {
  static docTitle = "Json Home Config";

  constructor(props) {
    super(props);
    this.state = {};
    document.title = ConfigPage.docTitle;
  }
  render() {
    var socket = this.props.socket;
    return (
      <button
        onClick={function() {
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
