import React from 'react';
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import Wrapper from './components/wrapper';
import Sequencer from './components/Sequencer';
import Record from './components/Record';
import CSSModules from 'react-css-modules';
import styles from './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul styleName="nav-list">
            <li>
              <Link styleName="link" to="/">Home</Link>
            </li>
            <li>
              <Link styleName="link" to="/sequencer">Sequencer</Link>
            </li>
            <li>
              <Link styleName="link" to="/record">Recorder</Link>
            </li>
            <li>
              <Link styleName="link" to="/sampler">Sampler</Link>
            </li>
          </ul>
        </nav>
        <div styleName="App">
          <Route path="/sequencer" component={Sequencer} />
          <Route path="/record" component={Record} />
          <Route path="/sampler" component={Wrapper} />
        </div>
      </div>
    </Router>
  )
}

export default CSSModules(App, styles);
