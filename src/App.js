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
      getData("https://api.judge0.com/submissions/" + res);
    });

    async function getData(url) {
      const response = await fetch(url);
      console.log(url);

      const output = await response.json();
      console.log(output);
    }
    async function postData(url = "", data = {}) {
      // Default options are marked with *
      console.log("sending");
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      let token = await response.json(); // parses JSON response into native JavaScript objects
      return await token.token;
      // let output = await fetch(
      //   urlBase + token.token.toString()
      // ).then(response => response.json());
      // await console.log(output);

      // return await output;
    }
  };

  render() {
    console.log(this.state.inputText);
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
