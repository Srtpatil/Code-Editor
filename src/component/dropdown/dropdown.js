import React, { Component } from "react";
import "./dropdown.css";

class Dropdown extends Component {
  option = Object.keys(this.props.options).map(key => {
    if (typeof this.props.options[key] === "object") {
      return Object.keys(this.props.options[key]).map(val => (
        <option value={key}>{this.props.options[key][val]}</option>
      ));
    } else {
      return <option value={key}>{this.props.options[key]}</option>;
    }
  });

  render() {
    return (
      <select
        onChange={this.props.selected}
        id={this.props.id}
        className="select_box"
      >
        {this.option}
      </select>
    );
  }
}

export default Dropdown;
