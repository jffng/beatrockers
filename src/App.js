import React, { Component } from 'react';
import styles from './App.css';
import Tone from 'tone';
import Nexus from 'nexusui';
import CSSModules from 'react-css-modules';

class App extends Component {
  constructor(props){
    super(props)

    this.initTone = this.initTone.bind(this);
    this.reset = this.reset.bind(this);
    this.setHouse = this.setHouse.bind(this);
    this.setReggaeton = this.setReggaeton.bind(this);
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

    this.sampleNames = ['HH', 'Snare', 'Kick'];
    this.nx = new Nexus.Sequencer('#target', {
      'mode': 'toggle',
      'rows': 3,
      'columns': 16
    });

    this.loop = new Tone.Sequence((time, col) => {
      try {
        for (let i = 0; i < 3; i++){
          let column = this.nx.matrix.pattern;
          if (column[i][col] === true){
            //slightly randomized velocities
            let vel = Math.random() * 0.5 + 0.5;
            this.drums.get(this.sampleNames[i]).start(time, 0, "16n", 0, vel); // where the note is actually being fired
          }
        }
      } catch (err){
        console.log('error')
      }
		}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

    this.transport.start();
    this.loop.start();
  }

  reset(){
    this.nx.matrix.set.all([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
    this.transport.bpm.value = 90
  }

  setHouse(){
    this.nx.matrix.set.all([
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
    ]);
    this.transport.bpm.value = 120
  }

  setReggaeton(){
    this.nx.matrix.set.all([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0]
    ]);
    this.transport.bpm.value = 100
  }
  
  render() {
    return (
      <div styleName="App">
        <code styleName='header'>beat rockers sequencer demo</code>
        <div styleName='sequencer'>
          <div>
            <div styleName='sample'>hh</div>
            <div styleName='sample'>snare</div>
            <div styleName='sample'>kick</div>
          </div>
          <div id="target" styleName='target'></div>
        </div>
        <div>
          <button onClick={this.reset}>Reset</button>
          <button>Hip/ Hop</button>
          <button onClick={this.setReggaeton}>Reggaeton</button>
          <button onClick={this.setHouse}>House</button>
        </div>
      </div>
    );
  }
}

export default CSSModules(App, styles);
