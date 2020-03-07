import CodeMirror from "react-codemirror";
import React, { Component } from "react";
import "./editor.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";

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
