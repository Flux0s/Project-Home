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
      <header className="mdc-top-app-bar">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-mdc-top-app-bar__section" />
        </div>
      </header>
    );
  }
}

export default App;
