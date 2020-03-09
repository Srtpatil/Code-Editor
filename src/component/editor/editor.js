import CodeMirror from "react-codemirror";
import React, { Component } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/clike/clike";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "./editor.css";
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
    return (
      <CodeMirror
        ref={c => (this.cm = c)}
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
