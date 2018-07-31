import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import ConfigPage from "./routes/ConfigPage";
import AuthenticationManager from "./Components/Authentication";
import "./app.scss";

const Auth = new AuthenticationManager();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <LoginPage {...props} authenticate={Auth.authenticate} />
            )}
          />
          <PrivateRoute
            path="/config"
            component={ConfigPage}
            logout={this.logout}
            socket={Auth.getSocket()}
          />
          <Redirect to="/config" />
        </Switch>
      </BrowserRouter>
    );
  }
  logout = () => {
    console.log("Logging out...");
    withRouter(({ history }) => Auth.signout(() => history.push("/")));
  };
}

const PrivateRoute = ({ component: Component, path: Path, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (Auth.isAuthenticated) {
        window.console.log(
          "Authenticated! displaying requested private component..."
        );
        return <Component {...props} />;
      } else {
        window.console.log("Unauthenticated! redirecting to: /login...");
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
