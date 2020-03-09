import CodeMirror from "react-codemirror";
import React, { Component } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "./editor.css";
import "codemirror/addon/display/fullscreen.css";
import "codemirror/addon/display/fullscreen";



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
          autofocus: this.props.isFullScreen,
          extraKeys: {
            F11: function(cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            Esc: function(cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
          
          }
        }}
        onChange={this.props.changed}
      />
    );
  }
}

export default Editor;
