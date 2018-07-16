import React, { Component } from "react";
import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageContent: null,
      pageTitle: "Home"
    };
  }
  render() {
    return (
      <div>
        <header>
          <Navbar pageTitle={this.state.pageTitle} />
        </header>
        <section className="main">
          <Body />
        </section>
        <footer />
      </div>
    );
  }
}

class Navbar extends Component {
  render() {
    return <nav />;
  }
}
class Body extends Component {
  render() {
    return (
      <div>
        <button className="my-button mdc-button mdc-button--raised">
          Button
        </button>
      </div>
    );
  }
}

export default App;
