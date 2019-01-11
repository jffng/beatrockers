import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import styled from 'styled-components';


const ListWrapper = styled.div`
  text-align: left;
  width: 680px;
  margin: 0 auto;
`

class List extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>
      <ListWrapper>
        <p>List of all functionalities</p>
          <li>
            <Link to="/sequencer">Sequencer</Link>
          </li>
          <li>
            <Link to="/record">Recorder</Link>
          </li>
          <li>
            <Link to="/sampler">Sampler</Link>
          </li>
           <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ListWrapper>
      </div>
    )
  }
}

export default List