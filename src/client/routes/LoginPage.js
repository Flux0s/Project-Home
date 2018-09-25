import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Logo from "./../img/Logo-Large.png";
import theme from "../Components/Theme";


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
  },
  form: {
    "display": "inline-grid"
  },
  textField: {
    "margin-top": theme.spacing.unit,
    width: 200,
  },
  buttonGroup: {
    display: "flex",
    "justify-content": "flex-end",
    "margin-top": theme.spacing.unit
  },
  button: {

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
      return <Redirect to={ from } />;
    } else
      return (
        <Grid container className={ classes.root }>
          <Grid item xs={ 12 }>
            <Paper className={ classes.paper }>
              <img src={ Logo } className="login-logo" />
              <Typography variant="display2" className={ classes.title }>
                Json Home
              </Typography>
              <form className={ classes.form } action={ LoginPage.apiEndpoint } method="POST" id="login-form">
                <TextField
                  type="text"
                  className={ classes.textField }
                  id="username-input"
                  name="username"
                  label="Username"
                  required
                />
                <TextField
                  type="password"
                  className={ classes.textField }
                  id="password-input"
                  name="password"
                  label="Password"
                  required
                />
                <Grid item xs={ 12 } className={ classes.buttonGroup }>
                  <Button
                    variant="contained" color="primary"
                    className={ classes.button }
                    onClick={ this.handleClick }
                  >
                    Login
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      );
  }
  handleClick = () => {
    document.getElementById("login-form").submit();// Form submission
  }
}

export default withStyles(styles)(LoginPage);
