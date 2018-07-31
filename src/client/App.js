import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import LoginPage, { Auth } from "./routes/LoginPage";
import ConfigPage from "./routes/ConfigPage";
import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute
            path="/config"
            component={ConfigPage}
            logout={this.logout}
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
        window.console.log("Authenticated! displaying: ", Path.pathname);
        return <Component {...props} />;
      } else {
        window.console.log("Unauthenticated! redirecting to: /login");
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
