import React from "react";
import {
  MDCLinearProgress,
  MDCLinearProgressFoundation
} from "@material/linear-progress";
import classnames from "classnames";

export default class LinearProgressBar extends React.Component {
  static updateInterval = 1;
  static closeTimeout = 1 * 1000;
  foundation_ = null;

  constructor(props) {
    super(props);
    this.LinearProgressElement = React.createRef();
  }

  state = { classList: new Set(), style: {}, visible: true };

  get classes() {
    const { classList } = this.state;
    const { className, indeterminate, reversed, closed } = this.props;

    return classnames("mdc-linear-progress", Array.from(classList), className, {
      "mdc-linear-progress--indeterminate": indeterminate,
      "mdc-linear-progress--reversed": reversed,
      "mdc-linear-progress--closed": closed
    });
  }

  initIndicator = (indicatorEl) => {
    if (!indicatorEl) {
      return;
    }
    this.indicator = new MDCLinearProgress(indicatorEl);
    this.indicator.progress = 0;
  };

  render() {
    if (this.state.visible)
      return (
        <div
          className={this.classes}
          style={this.getMergedStyles()}
          role="progressbar"
          className="mdc-linear-progress"
          ref={this.initIndicator}
        >
          <div className="mdc-linear-progress__buffering-dots" />
          <div className="mdc-linear-progress__buffer" />
          <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
            <span className="mdc-linear-progress__bar-inner" />
          </div>
          <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
            <span className="mdc-linear-progress__bar-inner" />
          </div>
        </div>
      );
    else return <div />;
  }

  getMergedStyles = () => {
    const { style } = this.props;
    const { style: internalStyle } = this.state;
    return Object.assign({}, internalStyle, style);
  };

  setStyle = (varName, value) => {
    const updatedStyle = Object.assign({}, this.state.style);
    updatedStyle[varName] = value;
    this.setState({ style: updatedStyle });
  };

  setProgress = (value) => {
    this.indicator.progress = value;
  };

  close = () => {
    setTimeout(() => {
      this.indicator.close();
      this.setState({ visible: false });
    }, LinearProgressBar.closeTimeout);
  };

  get adapter() {
    return {
      addClass: (className) =>
        this.setState({
          classList: this.state.classList.add(className)
        }),
      removeClass: (className) => {
        const { classList } = this.state;
        classList.delete(className);
        this.setState({ classList });
      },
      hasClass: (className) => this.classes.split(" ").includes(className),
      getPrimaryBar: () =>
        document.querySelector(".mdc-linear-progress__primary-bar"),
      getBuffer: () => document.querySelector(".mdc-linear-progress__buffer"),
      setStyle: this.setStyle
    };
  }

  componentDidMount() {
    this.initializeFoundation();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
    this.indicator.destroy();
  }

  initializeFoundation = () => {
    this.foundation_ = new MDCLinearProgressFoundation(this.adapter);

    this.foundation_.init();
  };
}
