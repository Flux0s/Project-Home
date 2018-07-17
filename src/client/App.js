import React, { Component } from "react";
import LoginPage from "./login.js";
import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar pageTitle={this.state.pageTitle} />

        <section>
          <div />
        </section>
        <footer />
      </div>
    );
  }
}

class Navbar extends Component {
  render() {
    return (
      <header className="mdc-toolbar">
        <div className="mdc-toolbar__row">
          <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
            <span className="navbar-title-link">
              <h1 className="mdc-top-app-bar__title">Title</h1>
            </span>
          </section>
        </div>
      </header>
    );
  }
}

export default App;
