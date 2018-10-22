import React, { Component } from 'react';
import styles from './App.css';
import Tone from 'tone';
import Nexus from 'nexusui';
import CSSModules from 'react-css-modules';

class App extends Component {
  constructor(props){
    super(props)

    this.initTone = this.initTone.bind(this);
  }

  componentDidMount(){
    this.initTone();
  }

  initTone(){
    this.transport = Tone.Transport;
    this.drums = new Tone.Players({
      "Kick": "audio/kick.mp3",
      "HH": "audio/hh.mp3",
      "Snare": "audio/snare.mp3"
    }, {
      "volume": -10,
      "fadeOut": "32n"
    }).toMaster();

    this.sampleNames = ['Kick', 'HH', 'Snare'];
    this.matrix = new Nexus.Sequencer('#target', {
      'size': [600, 400],
      'mode': 'toggle',
      'rows': 3,
      'columns': 10
    });

		//this.loop = new Tone.Sequence(function(time, col){
		//	let column = matrix1.matrix[col];
		//	for (let i = 0; i < 3; i++){
		//		if (column[i] === 1){
		//				//slightly randomized velocities
		//				let vel = Math.random() * 0.5 + 0.5;
		//				this.drums.get(this.sampleNames[i]).start(time, 0, "32n", 0, vel);
		//		}
		//	}
		//}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");
  }
  
  render() {
    return (
      <div className="App">
        <div id="target"></div>
      </div>
    );
  }
}

export default CSSModules(App, styles);
