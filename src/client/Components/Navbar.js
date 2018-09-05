import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import { ListItem } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Logo from "../img/Logo-Large.png";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  AppBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  avatar: {
    marginRight: theme.spacing.unit * 2,
    padding: "6px",
    height: "28px",
    width: "28px",
    "background-color": "#fff",
    "border-radius": "50%"
  },
});

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar className={ classes.AppBar }>
        <Toolbar>
          <Avatar className={ classes.avatar } src={ Logo } />
          <Typography variant="headline" color="inherit" className={ classes.flex }>
            Json Home
            </Typography>
          <this.props.logoutButton />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
