import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Socket from "../Components/Socket";
import Navbar from "../Components/Navbar";
import Drawer from "../Components/Drawer";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";

const styles = {
  logoutButton: {}
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
        <Navbar
          logoutButton={ this.LogoutButton }
        />
        <Drawer />
      </div>
    );
  }

  LogoutButton = withRouter(({ history }) => (
    <Button
      variant="contained" color="secondary" className={ this.props.logoutButton }
      onClick={ () => {
        console.log("Sending Logout request...");
        this.state.socket.emit("Log_Out", () => {
          console.log("Logout callback invoked!");
          this.props.logout(() => history.push("/"));
        });
      } }
    >
      Log Out
    </Button>
  ));
}

export default withStyles(styles)(HomePage);
