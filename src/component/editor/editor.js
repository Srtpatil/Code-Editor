import CodeMirror from "react-codemirror";
import React, { Component } from "react";
import "./editor.css";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/dracula.css");
require("codemirror/addon/edit/closetag");

class Editor extends Component {
  render() {
    return (
      <CodeMirror
        value="Demo text"
        options={{
          mode: "xml",
          theme: "dracula",
          lineNumbers: true,
          autoCloseTags: true,
          autofocus: true
        }}
        onChange={(editor, data, value) => {}}
      />
    );
  }
}

export default Editor;
