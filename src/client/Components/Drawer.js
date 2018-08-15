import React, { Component } from "react";

class Drawer extends Component {
  render() {
    return (
      <nav className="mdc-drawer mdc-drawer--permanent mdc-typography home-drawer">
        <div className="mdc-drawer__toolbar-spacer home-nav__spacer" />
        <div className="mdc-drawer__content home-drawer-content">
          <nav id="icon-with-text-demo" className="mdc-list">
            <a className="mdc-list-item mdc-list-item--activated" href="#">
              <i
                className="material-icons mdc-list-item__graphic"
                aria-hidden="true"
              >
                inbox
              </i>
              Inbox
            </a>
            <li role="separator" className="mdc-list-divider" />
            <a className="mdc-list-item" href="#">
              <i
                className="material-icons mdc-list-item__graphic"
                aria-hidden="true"
              >
                star
              </i>
              Star
            </a>
          </nav>
        </div>
      </nav>
    );
  }
}
export default Drawer;
