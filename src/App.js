import React, { Component } from "react";
import Editor from "./component/editor/editor";
import Toolbar from "./component/toolbar/toolbar";
import "codemirror/lib/codemirror.css";
import "./App.css";

class App extends Component {
  state = {
    code: "",
    theme: "",
    language: "",
    isFullScreen: false
  };

  editorUpdated = newCode => {
    this.setState({
      code: newCode
    });
  };
  render() {
    return (
      <div>
        <h1>Code Editor</h1>
        <Toolbar />
        <div className="editor-container">
          <Editor
            changed={this.editorUpdated}
            title=""
            width=""
            height=""
            theme="dracula"
            language={this.state.language}
            value={this.state.code}
          />
        </div>
      </div>
    );
  }
}

export default App;
