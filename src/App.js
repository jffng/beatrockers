import React from 'react';
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import Sequencer from './components/Sequencer';
import Record from './components/Record';
import CSSModules from 'react-css-modules';
import styles from './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sequencer">Sequencer</Link>
            </li>
            <li>
              <Link to="/record">Recorder</Link>
            </li>
          </ul>
        </nav>
        <div styleName="App">
          <Route path="/sequencer" component={Sequencer} />
          <Route path="/record" component={Record} />
        </div>
      </div>
    </Router>
  )
}

export default CSSModules(App, styles);
