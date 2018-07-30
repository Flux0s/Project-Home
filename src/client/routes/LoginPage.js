import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Logo from "./../img/Logo-Large.png";
import Socket from "./Components/socket";

const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    var socket = new Socket(false).getSocket();
    socket.on("Authentication_Successful", cb); // fake async
    this.isAuthenticated = true;
  },
  signout(cb) {
    cb();
    this.isAuthenticated = false;
  }
};

class LoginPage extends Component {
  static docTitle = "Login";
  static apiEndpoint = "/api";
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
    document.title = LoginPage.docTitle;
  }
  login = () => {
    Auth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div className="login">
        <section className="login-section mdc-card">
          <img src={Logo} className="login-logo" />
          <h1 className="login-title"> Json Home </h1>

          <form action={LoginPage.apiEndpoint} method="POST">
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
              <button
                onClick={this.login()}
                className="mdc-button mdc-button--raised login-next"
              >
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export { Auth };
export default LoginPage;
