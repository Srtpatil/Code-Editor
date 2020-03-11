import React, { Component } from "react";
import "./navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <h1>Code Editor</h1>
        <ul className="nav-item">
          <li>
            <a href="#">item1</a>
          </li>
          <li>
            <a href="#">item2</a>
          </li>
          <li>
            <a href="#">item3</a>
          </li>
          <li>
            <a href="#">item4</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
