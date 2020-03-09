import CodeMirror from "react-codemirror";
import React, { Component } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/clike/clike";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "./editor.css";

class Editor extends Component {
  render() {
    return (
      <CodeMirror
        value={this.props.value}
        options={{
          mode: this.props.language,
          theme: this.props.theme,
          lineNumbers: true,
          autoCloseTags: true,
          autofocus: true
        }}
        onChange={this.props.changed}
      />
    );
  }
}

export default Editor;
