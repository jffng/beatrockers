import React from 'react';
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import Wrapper from './components/wrapper';
import Sequencer from './components/Sequencer';
import Record from './components/Record';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import SignInPage from './components/SignIn';
import List from './components/List';

import * as ROUTES from './constants/routes';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul styleName="nav-list">
            <li>
              <Link styleName="link" to="/list">Index</Link>
            </li>
             <li>
              <Link styleName="link" to="/signin">Sign In</Link>
            </li>
          </ul>
        </nav>
        <div styleName="App">
          <Route path="/list" component={List} />
          <Route path="/sequencer" component={Sequencer} />
          <Route path="/record" component={Record} />
          <Route path="/sampler" component={Wrapper} />
          <Route path="/signin" component={SignInPage} />
        </div>
      </div>
    </Router>
  )
}

export default CSSModules(App, styles);
