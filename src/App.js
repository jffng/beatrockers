import React, { Component } from 'react';
import styles from './App.css';
import Wrapper from './components/wrapper.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          <code>beat rockers aww yea</code>
        </p>
       <Wrapper />
      </div>
    );
  }
}

export default App;
