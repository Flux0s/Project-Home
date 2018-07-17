import React, { Component } from "react";
import LoginPage from "./login.js";
import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Json-Home"
    };
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
      <header className="toolbar mdc-toolbar">
        <div className="mdc-toolbar__row">
          <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
            <span href="/" className="title-link">
              <div className="logo" />
              <h1 className="toolbar-title mdc-toolbar__title">
                {this.props.pageTitle}
              </h1>
            </span>
          </section>
        </div>
      </header>
    );
  }
}

export default App;
