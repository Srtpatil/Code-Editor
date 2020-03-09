import React, { Component } from "react";
import Editor from "./component/editor/editor";
import Toolbar from "./component/toolbar/toolbar";
import "./App.css";

class App extends Component {
  state = {
    code: "",
    theme: "material-darker",
    language: "text/x-csrc",
    isFullScreen: false,
    isReset: false,
    inputText: "",
    outputText: ""
  };

  editorUpdated = newCode => {
    this.setState({
      code: newCode
    });
  };

  inputUpdated = newInput => {
    this.setState({
      inputText: newInput
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

  runCode = () => {
    let data = {
      source_code: this.state.code,
      language_id: "48",
      stdin: this.state.inputText
    };

    let urlBase = "https://api.judge0.com/submissions/";

    postData(urlBase, data).then(res => {
      let query = urlBase + res;
      setTimeout(async () => {
        let op = await getData(query);
        this.setState({
          outputText: op.stdout
        });

        console.log(this.state);
      }, 1000);
    });

    async function getData(url) {
      const response = await fetch(url);

      const output = await response.json();
      return output;
    }

    async function postData(url = "", data = {}) {
      console.log("sending");
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      let token = await response.json();
      return await token.token;
    }
  };

  render() {
    console.log(this.state);

    if (this.state.isReset) {
      this.setState({
        code: "",
        inputText: "",
        outputText: ""
      });
    }

    return (
      <div className="App">
        <h1>Code Editor</h1>
        <Toolbar
          selected={this.selectHandler}
          fullScreen={this.fullScreenToggle}
          reset={this.resetCode}
          runCode={this.runCode}
        />
        <span className="input-title">Input</span>
        <div className="interface">
          <div className="editor-container">
            <Editor
              changed={this.editorUpdated}
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
                changed={this.inputUpdated}
                theme={this.state.theme}
                isReadOnly={false}
                lineNumber={false}
                autoFocus={false}
              />
            </div>
            <div className="output-container">
              <span className="output-title">Output</span>

              <Editor
                theme={this.state.theme}
                reset={this.state.isReset}
                isReadOnly={true}
                lineNumber={false}
                autoFocus={false}
                value={this.state.outputText}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
