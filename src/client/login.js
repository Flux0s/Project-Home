import React, { Component } from "react";

class LoginPage extends Component {
  constructor(props) {
    super();
    this.state = {
      Title: "Login"
    };
  }
  render() {
    return null;
  }
  GetTitle = () => {
    return this.state.Title;
  };
}

export default LoginPage;
