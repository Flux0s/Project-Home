import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Socket from "../Components/Socket";
import Navbar from "../Components/Navbar";
import Drawer from "../Components/Drawer";
import { withRouter } from "react-router-dom";

const styles = {
  classes: {

  }
}

class HomePage extends Component {
  static docTitle = "Json Home Config";
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket(true).getSocket()
    };
    document.title = HomePage.docTitle;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="home">
        <Navbar logoutButton={ this.LogoutButton } />
        <Drawer />
      </div>
    );
  }

  LogoutButton = withRouter(({ history }) => (
    <button
      onClick={ () => {
        console.log("Sending Logout request...");
        this.state.socket.emit("Log_Out", () => {
          console.log("Logout callback invoked!");
          this.props.logout(() => history.push("/"));
        });
      } }
      className="mdc-button mdc-button--unelevated home-logout"
    >
      Log Out
    </button>
  ));
}

export default withStyles(styles)(HomePage);
