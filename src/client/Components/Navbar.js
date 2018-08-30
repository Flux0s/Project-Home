import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import Logo from "../img/Logo-Large.png";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: theme.spacing.unit * 2,
  },
});

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.root }>
        <AppBar>
          <Toolbar>
            <Avatar className={ classes.avatar } src={ Logo } />
            <Typography variant="headline" color="inherit" className={ classes.flex }>
              Json Home
            </Typography>
            <this.props.logoutButton />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
