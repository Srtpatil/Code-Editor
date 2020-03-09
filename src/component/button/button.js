import React, { Component } from "react";
import "./button.css";

class Button extends Component {
  render() {
    return (
      <button className="btn" onClick={this.props.click}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
