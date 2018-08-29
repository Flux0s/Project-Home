import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Logo from "./../img/Logo-Large.png";

const styles = (theme) => ({
  root: {
    justify: "center",
    height: "100%",
    width: "100%",
    position: "fixed",
    "background-image":
      "linear-gradient(" +
      theme.palette.primary.main +
      ", " +
      theme.palette.secondary.main +
      ")"
  },
  paper: {
    display: "inline-block",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    padding: "2.5em",
    "text-align": "center"
  },
  title: {
    "margin-bottom": "0.6em"
  }
});

class LoginPage extends Component {
  static docTitle = "Login";
  static apiEndpoint = "/api";

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: this.props.loggedIn
    };
    document.title = LoginPage.docTitle;
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    const { classes } = this.props;

    if (redirectToReferrer) {
      // console.log("Redirecting to: ", from);
      return <Redirect to={from} />;
    } else
      return (
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <img src={Logo} className="login-logo" />
              <Typography variant="display2" className={classes.title}>
                {" "}
                Json Home{" "}
              </Typography>

              <form
                action={LoginPage.apiEndpoint}
                // id="login-form"
                // onSubmit={this.handleSubmit}
                method="POST"
              >
                <div className="mdc-text-field mdc-text-field--box login-username">
                  <input
                    type="text"
                    className="mdc-text-field__input"
                    id="username-input"
                    name="username"
                    required
                  />
                  <label
                    className="mdc-floating-label"
                    htmlFor="username-input"
                  >
                    Username
                  </label>
                  <div className="mdc-line-ripple" />
                </div>
                <div className="mdc-text-field mdc-text-field--box login-password">
                  <input
                    type="password"
                    className="mdc-text-field__input"
                    id="password-input"
                    name="password"
                    required
                  />
                  <label
                    className="mdc-floating-label"
                    htmlFor="password-input"
                  >
                    Password
                  </label>
                  <div className="mdc-line-ripple" />
                </div>
                <div className="login-button_container">
                  <button
                    // type="submit"
                    // form="login-form"
                    // value="Submit"
                    className="mdc-button mdc-button--raised login-next"
                  >
                    Login
                  </button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      );
  }
}

export default withStyles(styles)(LoginPage);
