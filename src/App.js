import React, { Component } from "react";
import Editor from "./component/editor/editor";
import Toolbar from "./component/toolbar/toolbar";
import "./App.css";

class App extends Component {
  state = {
    code: "hello World!",
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
        <Editor
          changed={this.editorUpdated}
          title=""
          width=""
          height=""
          theme={this.state.theme}
          language={this.state.language}
          value={this.state.code}
        />
      </div>
    );
  }
}

export default App;
