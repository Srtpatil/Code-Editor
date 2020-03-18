import CodeMirror from "react-codemirror";
import React, { Component } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/clike/clike";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "./editor.css";
import "codemirror/theme/material-darker.css";
import "codemirror/addon/display/fullscreen.css";
import "codemirror/addon/display/fullscreen";

class Editor extends Component {
  cm = null;

  render() {
    if (this.props.reset) {
      let editor = this.cm.getCodeMirror();
      editor.setValue("");
      this.props.helper();
    }

    if (this.props.isFullScreen) {
      let editor = this.cm.getCodeMirror();
      editor.setOption("fullScreen", true);
      this.props.fullscreenhelper();
    }

    if (this.props.value !== "" && this.props.isReadOnly) {
      let outputBox = this.cm.getCodeMirror();
      outputBox.setValue(this.props.value);
    }

    // "text/x-csrc": "48",
    // "text/x-c++src": "54",
    // "text/x-java": "62",
    // Python: "71"

    if (this.props.isSelected) {
      let text = "";
      switch (this.props.language) {
        case "text/x-csrc":
          text = "#include <stdio.h>\nint main()\n{\n   return 0;\n}";
          break;

        case "text/x-c++src":
          text =
            "#include <iostream>\nusing namespace std;\n\nint main() \n{\n\treturn 0;\n}";
          break;

        case "text/x-java":
          text =
            "public class Main {\n    public static void main(String[] args) {\n        \n    }\n}";
          break;

        case "Python":
          text = "#Your Python came here!";
          break;

        default:
          text = "";
      }

      let editor = this.cm.getCodeMirror();
      editor.setValue(text);
      this.props.selectHelper();
    }

    return (
      <CodeMirror
        className={this.props.class}
        ref={c => (this.cm = c)}
        value={this.props.value}
        options={{
          mode: this.props.language,
          theme: this.props.theme,
          lineNumbers: this.props.lineNumber,
          autoCloseTags: true,
          autofocus: this.props.autofocus,
          extraKeys: {
            F11: function(cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            Esc: function(cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
          },
          readOnly: this.props.isReadOnly
        }}
        onChange={this.props.changed}
      />
    );
  }
}

export default Editor;
