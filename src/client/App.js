import React, { Component } from "react";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import AuthenticationManager from "./Components/Authentication";
import ProgressBar from "./Components/ProgressBar";
import theme from "./Components/Theme";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const Auth = new AuthenticationManager();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      pageDisplay: this.LoadingPage
    };
  }

  componentWillMount() {
    Auth.checkAuthStatus
      .then(() => {
        this.setState({ pageDisplay: this.PageContents });
      })
      .catch((error) => { })
      .finally(() => {
        this.setState({ loaded: true });
      });
  }

  render() {
    return (
      <div>
        <ProgressBar loaded={ this.state.loaded } />
        <this.state.pageDisplay />
      </div>
    );
  }

  logout = (cb) => {
    console.log("Logging out...");
    Auth.signout(cb);
  };

  LoadingPage = () => <div> </div>;

  PageContents = () => (
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={ (props) => {
            return (
              <MuiThemeProvider theme={ createMuiTheme(theme) }>
                <LoginPage
                  { ...props }
                  loggedIn={ Auth.isAuthenticated }
                  authenticate={ Auth.authenticate }
                />
              </MuiThemeProvider>
            );
          } }
        />
        <PrivateRoute
          path="/home"
          component={ HomePage }
          logout={ this.logout }
        />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

const PrivateRoute = ({
  component: Component,
  logout: Logout,
  ...rest
}) => (
    <Route
      { ...rest }
      render={ (props) => {
        if (Auth.isAuthenticated) {
          // window.console.log("Authenticated! displaying requested private component...");
          return <Component { ...rest } { ...props } logout={ Logout } />;
        } else {
          // window.console.log("Unauthenticated! redirecting to: /login...");
          return (
            <Redirect
              to={ {
                pathname: "/login",
                state: { from: props.location }
              } }
            />
          );
        }
      } }
    />
  );

export default App;
