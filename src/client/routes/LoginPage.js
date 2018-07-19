import React, { Component } from "react";
import Logo from "./../img/Logo-Large.png";

class LoginPage extends Component {
  static docTitle = "Login";
  constructor(props) {
    super(props);
    this.state = {};
    document.title = LoginPage.docTitle;
  }
  render() {
    return (
      <section className="login">
        <div>
          <img src={Logo} className="login-logo" />
          <h1 className="login-title"> Json Home </h1>
        </div>
      </section>
    );
  }
}

export default LoginPage;
