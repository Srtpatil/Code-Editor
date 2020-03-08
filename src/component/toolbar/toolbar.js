import React, { Component } from "react";
import Dropdown from "../dropdown/dropdown";
class Toolbar extends Component {
  languages = {
    clike: ["C", "C++", "Java"],
    Python: "Python"
  };

  themes = {
    dracula: "dracula",
    material: "material"
  };
  render() {
    return (
      <div className="toolbar">
        <Dropdown
          options={this.languages}
          selected={this.props.selected}
          id="language"
        />

        <Dropdown
          options={this.themes}
          selected={this.props.selected}
          id="theme"
        />
      </div>
    );
  }
}

export default Toolbar;
