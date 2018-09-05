import React, { Component } from "react";
import { SwitchThemeBase } from "./Theme";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { ListItem } from "@material-ui/core";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Speaker from '@material-ui/icons/Speaker';
import BrightnessMedium from '@material-ui/icons/BrightnessMedium';
import ColorLens from '@material-ui/icons/ColorLens';

const drawerWidth = 240;

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: window.innerHeight - theme.mixins.toolbar
  },
  toolbar: theme.mixins.toolbar,
});

class PermanentDrawer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={ {
          paper: classes.drawerPaper,
        } }
      >
        <div className={ classes.toolbar } />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ColorLens />
            </ListItemIcon>
            <ListItemText primary="Light Settings" />
          </ListItem>
        </List>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Speaker />
            </ListItemIcon>
            <ListItemText primary="Spotify Settings" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={ this.props.changeMode }>
            <ListItemIcon>
              <BrightnessMedium />
            </ListItemIcon>
            <ListItemText primary="Night Mode" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}
export default withStyles(styles)(PermanentDrawer);
