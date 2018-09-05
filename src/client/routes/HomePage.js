import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Socket from "../Components/Socket";
import Navbar from "../Components/Navbar";
import PermanentDrawer from "../Components/PermanentDrawer";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  logoutButton: {

  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  }
})

class HomePage extends Component {
  static docTitle = "Json Home";
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
      <div className={ classes.root }>
        <Navbar
          logoutButton={ this.LogoutButton }
        />
        <PermanentDrawer
          changeMode={ this.props.changeMode } />
        <main className={ classes.content }>
          <div />
        </main>
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
