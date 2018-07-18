import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./routes/LoginPage";

import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Route path="/login" component={LoginPage} />
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      </BrowserRouter>
    );
  }
}

export default App;
