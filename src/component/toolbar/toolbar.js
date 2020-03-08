import React, { Component } from "react";

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
      </div>
    );
  }
}

export default Toolbar;
