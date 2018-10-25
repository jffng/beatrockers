import React, { Component } from 'react';
import styled from 'styled-components';
import { ReactMic } from 'react-mic';

const RecordButton = styled.button`
	color: black;
	border: 1px solid black;
	margin: 20px 20px;
	border-radius: 80px;
	width: 40px;
	height: 40px;
	font-size: 16px;

	:hover {
		color: red;
		border-color: red;
	}
`

class Record extends Component {

	render() {
		return (
			<div>
			<ReactMic
				record={this.props.record}
		        className="sound-wave"
		        onStop={this.props.onStop}
		        onData={this.props.onData}
		        strokeColor="#000000"
		        backgroundColor="#ffffff" />
			<div>
				<RecordButton onClick={this.props.startRecording}>&#9679;</RecordButton>
				<RecordButton onClick={this.props.stopRecording}>&#9632;</RecordButton>
			</div>
			</div>
		)
	}
}

export default Record;




