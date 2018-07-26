import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import ConfigPage from "./routes/ConfigPage";
import Socket from "./routes/Components/socket";

import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new Socket(false);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/config"
            render={(props) =>
              this.socket.isConnected() ? (
                <ConfigPage socket={new Socket(true)} {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            path="/login"
            render={
              (props) => (
                // this.socket.isConnected() ? (
                // <Redirect to="/config" />
                // ) : (
                <LoginPage {...props} />
              )
              // )
            }
          />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const ConfigRoute = ({ component: Component, Socket: socket, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        socket.connected ? (
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
