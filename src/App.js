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
    isSelected: false,
  };

  language_id = {
    "text/x-csrc": "48",
    "text/x-c++src": "54",
    "text/x-java": "62",
    Python: "71",
  };

  editorUpdated = (newCode) => {
    this.setState({
      code: newCode,
    });
  };

  inputUpdated = (newInput) => {
    this.setState({
      inputText: newInput,
    });
  };

  selectHandler = (e) => {
    if (e.target.id === "theme") {
      this.setState({
        theme: e.target.value,
      });
    } else if (e.target.id === "language") {
      this.setState({
        language: e.target.value,
        isSelected: true,
      });
    }
  };

  selectHelper = () => {
    this.setState({
      isSelected: false,
    });
  };

  resetCode = () => {
    this.setState((prevState) => {
      return { isReset: !prevState.isReset };
    });
  };

  fullScreenToggle = () => {
    this.setState((prevState) => {
      return {
        isFullScreen: true,
      };
    });
  };

  fullscreenhelper = () => {
    this.setState({
      isFullScreen: false,
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

  decode = (bytes) => {
    console.log("called decode");

    let escaped = escape(atob(bytes || ""));
    try {
      return decodeURIComponent(escaped);
    } catch {
      return unescape(escaped);
    }
  };

  runCode = () => {
    if (this.state.code !== "") {
      this.setState((prevState) => {
        return {
          isRunning: !prevState.isRunning,
        };
      });
      let data = {
        source_code: this.state.code,
        language_id: this.language_id[this.state.language],
        stdin: this.state.inputText,
      };

      let urlBase = "https://api.judge0.com/submissions/";

      // let sendText =
      //   "?base64_encoded=false&fields=stdout,stderr,status_id,language_id";

      postData(urlBase, data).then((res) => {
        setTimeout(fetchSubmission(res), 200);
      });

      let fetchSubmission = async (submission_token) => {
        let result = await getData(
          "https://api.judge0.com/submissions/" +
            submission_token +
            "?base64_encoded=true"
        );

        if (result.status.id <= 2) {
          setTimeout(fetchSubmission(submission_token), 200);
          return;
        } else {
          let output = "";
          console.log(result);
          if (result.stdout != null) {
            output = this.decode(result.stdout);
          } else if (result.compile_output != null) {
            output = this.decode(result.compile_output);
          } else if (result.stderr != null) {
            output = this.decode(result.stderr);
          }

          this.setState({
            outputText: output,
          });

          this.setState((prevState) => {
            return {
              isRunning: !prevState.isRunning,
            };
          });
        }
      };
    } else {
      let output = "code dude";
      this.setState({
        outputText: output,
      });

      this.setState((prevState) => {
        return {
          isRunning: false,
        };
      });
    }

    async function getData(url) {
      const response = await fetch(url);

      const output = await response.json();

      return output;
    }

    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let token = await response.json();
      return await token.token;
    }
  };

  render() {
    let scrollClass = "scrollinout";
    if (this.state.isReset) {
      this.setState({
        code: "",
      });
    }
    let loading = null;
    if (this.state.isRunning) {
      loading = <Loader />;
    }

    return (
      <div className="App">
        <Navbar title="Code Editor" />

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
              autoFocus={false}
              lineNumber={true}
              class={scrollClass}
            />
          </div>
          <div class="Output">{loading === null ? "Output" : loading}</div>
          <div class="Output-box">
            <Editor
              theme={this.state.theme}
              isReadOnly={true}
              autoFocus={false}
              value={this.state.outputText}
              lineNumber={true}
              class={scrollClass}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
