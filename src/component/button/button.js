import React, { Component } from "react";
import "./button.css";

class Button extends Component {
  render() {
    let classes = "btn " + this.props.class;
    return (
      <button className={classes} onClick={this.props.clicked}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
