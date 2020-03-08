import React, { Component } from "react";
import Button from "../button/button";
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

        <Button>
          <span class="glyphicon glyphicon-fullscreen"></span>
        </Button>
        <Button>
          <span class="glyphicon glyphicon-refresh"></span>
        </Button>
      </div>
    );
  }
}

export default Toolbar;
