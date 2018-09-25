import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
});

class LightsPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div> Light Settings </div>
    );
  }
}

export default withStyles(styles)(LightsPage);
