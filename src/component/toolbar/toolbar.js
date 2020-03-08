import React, { Component } from "react";
import Button from "../button/button";
class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar">
        <select id="lang">
          <option value="clike">C</option>
          <option value="clike">C++</option>
          <option value="clike">Java</option>
          <option value="Python">Python</option>
        </select>

        <select id="Theme">
          <option value="clike">C</option>
          <option value="clike">C++</option>
          <option value="clike">Java</option>
          <option value="Python">Python</option>
        </select>

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
