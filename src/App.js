import React, { Component } from "react";
import Editor from "./component/editor/editor";
import Toolbar from "./component/toolbar/toolbar";
import "./App.css";

class App extends Component {
  state = {
    code: "hello World!",
    theme: "dracula",
    language: "clike",
    isFullScreen: false
  };

  editorUpdated = newCode => {
    this.setState({
      code: newCode
    });
  };

  selectHandler = e => {
    if (e.target.id === "theme") {
      this.setState({
        theme: e.target.value
      });
    } else if (e.target.id === "language") {
      this.setState({
        language: e.target.value
      });
    }

    console.log(this.state);
  };
  render() {
    return (
      <div>
        <h1>Code Editor</h1>
        <Toolbar selected={this.selectHandler} />
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
