import React, { Component } from "react";
import theme from "./Components/Theme";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import AuthenticationManager from "./Components/Authentication";
import ProgressBar from "./Components/ProgressBar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const Auth = new AuthenticationManager();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      pageDisplay: this.LoadingPage,
      theme: createMuiTheme(theme)
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
    // <MuiThemeProvider theme={ this.state.theme }>
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={ (props) => {
            return (
              <LoginPage
                { ...props }
                loggedIn={ Auth.isAuthenticated }
                authenticate={ Auth.authenticate }
              />
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
    // </MuiThemeProvider>
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
