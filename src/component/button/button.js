import React, { Component } from "react";
import "./button.css";

class Button extends Component {
  render() {
    let classes = "btn " + this.props.class;
    console.log(classes);
    return <button className={classes}>{this.props.children}</button>;
  }
}

export default Button;
