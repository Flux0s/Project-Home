import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Logo from "../img/Logo.png";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.root }>
        <AppBar>
          <Toolbar>
            {/* <IconButton className={ classes.menuButton } color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="title" color="inherit" className={ classes.flex }>
              Json Home
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      // <header className="navbar mdc-toolbar">
      //   <div className="navbar-row mdc-toolbar__row">
      //     <section className="navbar-section mdc-toolbar__section mdc-toolbar__section--align-start">
      //       <a href="/" className="navbar-title-link">
      //         <img className="navbar-logo" src={ Logo } />
      //         <h1 className="navbar-title mdc-toolbar__title">Json Home</h1>
      //       </a>
      //     </section>
      //     <section className="navbar-section mdc-toolbar__section mdc-toolbar__section--align-end">
      //       <this.props.logoutButton />
      //     </section>
      //   </div>
      // </header>
    );
  }
}

export default withStyles(styles)(Navbar);
