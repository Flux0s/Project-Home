import React, { Component } from "react";
import { withStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Socket from "../Components/Socket";
import Navbar from "../Components/Navbar";
import PermanentDrawer from "../Components/PermanentDrawer";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import theme from "../Components/Theme";

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
      socket: new Socket(true).getSocket(),
      theme: createMuiTheme(theme)
    };
    document.title = HomePage.docTitle;
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={ this.state.theme }>
        <div className={ classes.root }>
          <Navbar
            logoutButton={ this.LogoutButton }
          />
          <PermanentDrawer
            changeMode={ this.ChangeMode } />
          <main className={ classes.content }>
            <div />
          </main>
        </div>
      </ MuiThemeProvider>
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

  ChangePrimaryColor = (color) => {
    var temp = { theme };
    temp.palette.primary.main = color;
    this.setState({ theme: temp });
  }

  ChangeMode = () => {
    var tempTheme = this.state.theme;
    window.console.log("Switching theme from type: ", this.state.theme.palette.type);
    tempTheme.palette.type = (this.state.theme.palette.type === 'light') ? 'dark' : 'light';
    this.setState({ theme: createMuiTheme(tempTheme) });
  }

}

export default withStyles(styles)(HomePage);
