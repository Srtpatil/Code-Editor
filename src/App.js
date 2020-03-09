import React, { Component } from "react";
import Editor from "./component/editor/editor";
import Toolbar from "./component/toolbar/toolbar";
import "./App.css";

class App extends Component {
  state = {
    code: "",
    theme: "dracula",
    language: "clike",
    isFullScreen: false,
    isReset: false
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
  };

  resetCode = () => {
    this.setState(prevState => {
      return { isReset: !prevState.isReset };
    });
  };

  fullScreenToggle = () => {
    this.setState(prevState => {
      return {
        isFullScreen: !prevState.isFullScreen
      };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Code Editor</h1>
        <Toolbar
          selected={this.selectHandler}
          fullScreen={this.fullScreenToggle}
          reset={this.resetCode}
        />
        <span className="input-title">Input</span>
        <div className="interface">
          <div className="editor-container">
            <Editor
              changed={this.editorUpdated}
              title=""
              width=""
              height=""
              theme={this.state.theme}
              language={this.state.language}
              value={this.state.code}
              isFullScreen={this.state.isFullScreen}
              reset={this.state.isReset}
              helper={this.resetCode}
              isReadOnly={false}
              lineNumber={true}
              autoFocus={true}
            />
          </div>

          <div className="IO-container">
            <div className="input-container">
              <Editor
                changed={this.editorUpdated}
                title=""
                width=""
                height=""
                theme={this.state.theme}
                isReadOnly={false}
                lineNumber={false}
                autoFocus={false}
              />
            </div>
            <div className="output-container">
              <span className="output-title">Output</span>

              <Editor
                changed={this.editorUpdated}
                title=""
                width=""
                height=""
                theme={this.state.theme}
                isReadOnly={true}
                lineNumber={false}
                autoFocus={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
