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

const Body = () => {
  return (
    <div>
      <button class="foo-button mdc-button">Button</button>
    </div>
  );
};

export default App;
