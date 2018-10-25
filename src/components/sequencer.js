import React, { Component } from 'react';
import styles from '../App.css';
import Tone from 'tone';
import Nexus from 'nexusui';
import CSSModules from 'react-css-modules';

class Sequencer extends Component {
  constructor(props){
    super(props)

    this.initTone = this.initTone.bind(this);
  }

  componentDidMount(){
    this.initTone();
  }

  updateDrums(){

    if (this.props.recordFile.length){
      console.log('update drum is called')
      this.drums = new Tone.Players({
        "Kick": this.props.recordFile[0],
        "HH": "audio/hh.mp3",
        "Snare": "audio/snare.mp3"
      }, {
        "volume": -10,
        "fadeOut": "32n"
      }).toMaster();
      }
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
            this.drums.get(this.sampleNames[i]).start(time, 0, "16n", 0, vel);
          }
        }
      } catch (err){
        console.log('error')
      }
		}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

    this.transport.start();
    this.loop.start();
  }
  
  render() {
    return (
        <div styleName='sequencer'>
          <div>
            <div styleName='sample'>hh</div>
            <div styleName='sample'>snare</div>
            <div styleName='sample'>kick</div>
          </div>
          <div id="target" styleName='target'></div>
        </div>

    );
  }
}

export default CSSModules(Sequencer, styles);