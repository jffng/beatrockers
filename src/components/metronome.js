import React, { Component } from 'react';
import Tone from 'tone';
import Nexus from 'nexusui';

var metronome;
var time;

//TODO: when click stop metronome, sequence also stop...

class Metronome extends Component {
	constructor(props) {
		super(props)

		this.initMetronome = this.initMetronome.bind(this);
		this.playMetronome = this.playMetronome.bind(this);
		this.stopMetronome = this.stopMetronome.bind(this);
		this.updateBPM = this.updateBPM.bind(this);
		this.displayBPM = this.displayBPM.bind(this);

		 this.state = {
	      bpm: 60
	    }
	}

	componentDidMount() {
		this.initMetronome();
	}

	initMetronome() {
		this.transport = Tone.Transport;
		this.transport.bpm.value = 60;
		metronome = new Tone.Player("audio/kick.mp3").toMaster();
	}

	playMetronome() {
		time = this.transport.scheduleRepeat(function(time) {
			metronome.start();
		}, "8n");
		this.transport.start();
	}

	stopMetronome() {
		this.transport.stop();
		this.transport.clear(time);
	}

	updateBPM(e) {
		this.stopMetronome();
		this.transport.bpm.value = e.target.value;
		this.playMetronome();

		this.setState({
	      bpm: e.target.value
	    });
	}

	displayBPM(bpm) {
		return <div><p>current BPM: {bpm}</p></div>
	}

	render() {
		const currentBPM = this.displayBPM(this.state.bpm);

		return (
			<div>
				{currentBPM}
				<input id="slider" type="range" onChange={this.updateBPM} min="30" max="300" step="5"/>
				<button onClick={this.playMetronome}>start metronome</button>
				<button onClick={this.stopMetronome}>stop metronome</button>
			</div>
		)
	}
}

export default Metronome