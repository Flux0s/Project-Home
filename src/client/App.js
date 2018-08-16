import React, { Component } from "react";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import AuthenticationManager from "./Components/Authentication";
import ProgressBar from "./Components/ProgressBar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./app.scss";

const Auth = new AuthenticationManager();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressBar: ProgressBar,
      pageDisplay: this.LoadingPage
    };
  }

  componentWillMount() {
    Auth.checkAuthStatus
      .then(() => {})
      .catch((error) => {})
      .finally(() => {
        this.state.progressBar.LoadComplete();
      });
  }

  render() {
    return (
      <div>
        <this.state.progressBar />
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
          render={(props) => {
            return (
              <LoginPage
                {...props}
                loggedIn={Auth.isAuthenticated}
                authenticate={Auth.authenticate}
              />
            );
          }}
        />
        <PrivateRoute path="/home" component={HomePage} logout={this.logout} />
        <Redirect to="/home" />
        {/* <Redirect to="/login" /> */}
      </Switch>
    </BrowserRouter>
  );
}

const PrivateRoute = ({
  component: Component,
  path: Path,
  logout: Logout,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (Auth.isAuthenticated) {
        // window.console.log("Authenticated! displaying requested private component...");
        return <Component {...props} logout={Logout} />;
      } else {
        // window.console.log("Unauthenticated! redirecting to: /login...");
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);

// const AuthButton = withRouter(
//   ({ history }) =>
//     Auth.isAuthenticated ? (
//       <p>
//         Welcome!{" "}
//         <button
//           onClick={() => {
//             Auth.signout(() => history.push("/"));
//           }}
//         >
//           Sign out
//         </button>
//       </p>
//     ) : (
//       <p>You are not logged in.</p>
//     )
// );

export default App;
