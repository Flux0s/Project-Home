import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./routes/LoginPage";

import "./app.scss";

const homePage = "/login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectBack: false
    };
  }
  render() {
    const { from } = this.props.location.state || {
      from: { pathname: homePage }
    };

    if (this.state.redirectBack) return <Redirect to={from} />;
    return (
      <BrowserRouter>
        <Route path={homePage} component={LoginPage} />
        <PrivateRoute path="/secret" component={LoginPage} />
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  <Route
    {...rest}
    render={(props) =>
      Auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: homePage,
            state: { from: props.location }
          }}
        />
      )
    }
  />;
};

export default App;
