import React, { Component } from "react";
import Editor from "./component/editor/editor";
import Toolbar from "./component/toolbar/toolbar";
import Loader from "./component/loader/loader";
import Navbar from "./component/navbar/navbar";
import "./App.css";

class App extends Component {
  state = {
    code: "#include <stdio.h>\nint main()\n{\n   return 0;\n}",
    theme: "material-darker",
    language: "text/x-csrc",
    isFullScreen: false,
    isReset: false,
    isRunning: false,
    inputText: "",
    outputText: "",
    isSelected: false
  };

  language_id = {
    "text/x-csrc": "48",
    "text/x-c++src": "54",
    "text/x-java": "62",
    Python: "71"
  };

  editorUpdated = newCode => {
    this.setState({
      code: newCode
    });
  };

  parseId = id => {
    let txt = null;
    switch (id) {
      case 3:
        txt = "Accepted";
        break;
      case 5:
        txt = "Time Limit Exceeded";
        break;
      case 6:
        txt = "Compilation Error";
        break;
      case 7:
        txt = "Runtime Error (SIGSEGV)";
        break;
      case 8:
        txt = "Runtime Error (SIGXFSZ)";
        break;
      case 9:
        txt = "Runtime Error (SIGFPE)";
        break;
      case 10:
        txt = "Runtime Error (SIGABRT)";
        break;
      case 11:
        txt = "Runtime Error (NZEC)";
        break;
      case 12:
        txt = "Runtime Error (Other)";
        break;

      case 13:
        txt = "Internal Error";
        break;

      case 14:
        txt = "Exec Format Error";
        break;
      default:
        txt = "error occured while running you code";
        break;
    }

    this.setState({
      outputText: txt
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
        language: e.target.value,
        isSelected: true
      });
    }
  };

  selectHelper = () => {
    this.setState({
      isSelected: false
    });
  };

  resetCode = () => {
    this.setState(prevState => {
      return { isReset: !prevState.isReset };
    });
  };

  fullScreenToggle = () => {
    this.setState(prevState => {
      return {
        isFullScreen: true
      };
    });
  };

  fullscreenhelper = () => {
    this.setState({
      isFullScreen: false
    });
  };

  downloadCode = () => {
    let extention = "";
    switch (this.state.language) {
      case "text/x-csrc":
        extention = ".c";
        break;
      case "text/x-c++src":
        extention = ".cpp";
        break;
      case "text/x-java":
        extention = ".java";
        break;
      default:
        extention = ".txt";
        break;
    }

    const fileName = "main" + extention;
    const element = document.createElement("a");
    const file = new Blob([this.state.code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };

  runCode = () => {
    this.setState(prevState => {
      return {
        isRunning: !prevState.isRunning
      };
    });
    let data = {
      source_code: this.state.code,
      language_id: this.language_id[this.state.language],
      stdin: this.state.inputText
    };

    let urlBase = "https://api.judge0.com/submissions/";

    let sendText =
      "?base64_encoded=false&fields=stdout,stderr,status_id,language_id";

    postData(urlBase, data).then(res => {
      setTimeout(async () => {
        const result = await getData(
          "https://api.judge0.com/submissions/" + res + sendText
        );

        console.log(this.state);

        if (result.status_id !== 3) {
          this.parseId(result.status_id);
        } else {
          this.setState({
            outputText: result.stdout
          });
        }
        this.setState(prevState => {
          return {
            isRunning: !prevState.isRunning
          };
        });
      }, 2000);
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
        code: ""
      });
    }
    let loading = null;
    if (this.state.isRunning) {
      loading = <Loader />;
    }

    return (
      <div className="App">
        <Navbar title="Code Editor" />
        {/* <Toolbar
          selected={this.selectHandler}
          fullScreen={this.fullScreenToggle}
          reset={this.resetCode}
          runCode={this.runCode}
        />
        <span className="input-title ">Input</span>
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
              fullscreenhelper={this.fullscreenhelper}
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
              <span className="output-title">Output </span>
              <span className="loading">{loading}</span>

              <Editor
                theme={this.state.theme}
                isReadOnly={true}
                lineNumber={false}
                autoFocus={false}
                value={this.state.outputText}
              />
            </div>
          </div>
        </div> */}

        <div class="container">
          <div class="Toolbar">
            <Toolbar
              selected={this.selectHandler}
              fullScreen={this.fullScreenToggle}
              reset={this.resetCode}
              runCode={this.runCode}
              downloadCode={this.downloadCode}
            />
          </div>
          <div class="Input">Input</div>
          <div class="Editor">
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
              fullscreenhelper={this.fullscreenhelper}
              isSelected={this.state.isSelected}
              selectHelper={this.selectHelper}
            />
          </div>
          <div class="Input-box">
            <Editor
              changed={this.inputUpdated}
              theme={this.state.theme}
              isReadOnly={false}
              lineNumber={false}
              autoFocus={false}
            />
          </div>
          <div class="Output">Output {loading}</div>
          <div class="Output-box">
            <Editor
              theme={this.state.theme}
              isReadOnly={true}
              lineNumber={false}
              autoFocus={false}
              value={this.state.outputText}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
