import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import Auth from "./Authorization";

import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact strict path="/login" component={LoginPage} />
          <PrivateRoute path="/secret" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default App;
