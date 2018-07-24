import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import ConfigPage from "./routes/ConfigPage";
import Socket from "./routes/Components/socket";

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
          <PrivateRoute path="/config" component={ConfigPage} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const socket = new Socket();
  return (
    <Route
      {...rest}
      render={(props) =>
        socket.isAuthenticated ? (
          <Component socket={socket} {...props} />
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
