import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Logo from "./../img/Logo-Large.png";

class LoginPage extends Component {
  static docTitle = "Login";
  static apiEndpoint = "/api";

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: this.props.loggedIn
    };
    document.title = LoginPage.docTitle;
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      // console.log("Redirecting to: ", from);
      return <Redirect to={from} />;
    } else
      return (
        <div className="login">
          <section className="login-section mdc-card">
            <img src={Logo} className="login-logo" />
            <h1 className="login-title"> Json Home </h1>

            <form
              action={LoginPage.apiEndpoint}
              // id="login-form"
              // onSubmit={this.handleSubmit}
              method="POST"
            >
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
                  // type="submit"
                  // form="login-form"
                  // value="Submit"
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

export default LoginPage;
