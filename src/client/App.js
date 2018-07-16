import React, { Component } from "react";
import { MDCRipple } from "@material/ripple";
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
        <main>
          <Body />
        </main>
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
const ripple = new MDCRipple(document.querySelector(".foo-button"));

class Body extends Component {
  render() {
    return ripple;
  }
}

export default App;
