import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import ConfigPage from "./routes/ConfigPage";
import Socket from "./routes/Components/socket";

import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    console.log("Constructing!");
    CheckAuthStatus;
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={(props) => {
              return <LoginPage props={props} />;
            }}
          />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const CheckAuthStatus = new Promise(function(resolve, reject) {
  var socket = new Socket(true);
});

export default App;
