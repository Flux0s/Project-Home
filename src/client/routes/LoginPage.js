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
      <div className="login">
        <section className="login-section mdc-card">
          <img src={Logo} className="login-logo" />
          <h1 className="login-title"> Json Home </h1>

          <form action="/api" method="POST">
            <div className="mdc-text-field mdc-text-field--box login-username">
              <input
                type="text"
                className="mdc-text-field__input"
                id="username-input"
                name="username"
                required
              />
              <label className="mdc-floating-label" htmlFor="username-input">
                Username
              </label>
              <div className="mdc-line-ripple" />
            </div>
            <div className="mdc-text-field mdc-text-field--box login-password">
              <input
                type="password"
                className="mdc-text-field__input"
                id="password-input"
                name="password"
                required
              />
              <label className="mdc-floating-label" htmlFor="password-input">
                Password
              </label>
              <div className="mdc-line-ripple" />
            </div>
            <div className="login-button_container">
              <button className="mdc-button mdc-button--raised login-next">
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default LoginPage;
