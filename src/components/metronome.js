import React, { Component } from 'react';
import Tone from 'tone';

var metronome;
var time;

//TODO: slider to change bpm

class Metronome extends Component {
	constructor(props) {
		super(props)

		this.initMetronome = this.initMetronome.bind(this);
		this.playMetronome = this.playMetronome.bind(this);
		this.stopMetronome = this.stopMetronome.bind(this);
	}

	componentWillMount() {
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

	render() {
		return (
			<div>
				<input id="bpm" type="range" name="amountRange" min="30" max="300" value="120" step="5" />
				<button onClick={this.playMetronome}>start metronome</button>
				<button onClick={this.stopMetronome}>stop metronome</button>
			</div>
		)
	}
}

export default Metronome