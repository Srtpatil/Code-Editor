import React, { Component } from 'react';
import Editor from './component/editor/editor'
import './App.css';

class App extends Component{
  render(){
    return(
      <div>
        <h1>Hello World!</h1>
        <Editor />
      </div>
    )
  }
}

export default App;
