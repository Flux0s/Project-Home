import React from "react";
import Logo from "./img/Logo.png";

const Navbar = () => {
  return (
    <header className="navbar mdc-toolbar">
      <div className="navbar-row mdc-toolbar__row">
        <section className="navbar-section mdc-toolbar__section mdc-toolbar__section--align-start">
          <a href="/" className="navbar-title-link">
            <img className="navbar-logo" src={Logo} />
            <h1 className="navbar-title mdc-toolbar__title">Json Home</h1>
          </a>
        </section>
      </div>
    </header>
  );
};

export default Navbar;
