import React, { Component } from "react";
import "./button.css";

class Button extends Component {
  render() {
    return <button className="btn">{this.props.children}</button>;
  }
}

export default Button;
