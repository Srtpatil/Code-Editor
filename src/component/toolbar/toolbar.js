import React, { Component } from "react";
import Button from "../button/button";
import Dropdown from "../dropdown/dropdown";

import "./toolbar.css";

class Toolbar extends Component {
  languages = {
    "text/x-csrc": "C",
    "text/x-c++src": "C++",
    "text/x-java": "Java",
    Python: "Python"
  };

  themes = {
    "material-darker": "material-darker",
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
          class="ui dropdown"
        />
        <Dropdown
          options={this.themes}
          selected={this.props.selected}
          id="theme"
        />

        <Button class="ui labeled icon button run" clicked={this.props.runCode}>
          <i class="play icon"></i>
          Run
        </Button>

        <Button class="fullscreen" clicked={this.props.fullScreen}>
          <span class="glyphicon glyphicon-fullscreen"></span>
        </Button>
        <Button class="reset" clicked={this.props.reset}>
          <span class="glyphicon glyphicon-refresh"></span>
        </Button>
        <Button class="downloadCode" clicked={this.props.downloadCode}>
          <span class="glyphicon glyphicon-download-alt"></span>
        </Button>
      </div>
    );
  }
}

export default Toolbar;
