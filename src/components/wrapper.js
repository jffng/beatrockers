import React, { Component } from 'react';
import styled from 'styled-components';
import Record from './Record.js';
import Sequencer from './Sequencer.js';
// import Metronome from './Metronome.js';

const MixButton = styled.button`
  color: white;
  background-color: #d3d3d3;
  border: none;
  font-size: 14px;
  margin-top: 20px;
  width: 40px;
  height: 40px;

  :hover {
    background-color: black;
  }
`
const ProgressDot = styled.button`
	background-color: ${props => props.completed};
	border-radius: 30px;
	width: 10px;
	height: 10px;
	border: none;
	color: white;
	margin: 1px 1px;
	padding: 0px 0px;
`

const ProgressWrapper = styled.div`
	border: 1px solid #dbe0de;
	width: 130px;
	border-radius: 30px;
	margin: 30px auto;
`
const MixButtonWrapper = styled.div`
	display: inline;
	margin-right: 2px;
`

function ReplayButton(props) {
  let soundFile = props.file;
  let replayIndex = props.index;

  function play () {
    var audioSource = new Audio();
    audioSource.src = soundFile
    audioSource.play();
  }
  
  return (
    <MixButtonWrapper>
      <MixButton onClick={play}>{replayIndex + 1}</MixButton>
    </MixButtonWrapper>
  )
}


class Wrapper extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      record: false,
	      recordFile: []
	    }

    	this.onStop = this.onStop.bind(this);

  	}

	startRecording = () => {
	    this.setState({
	      record: true
	    });
	}

	stopRecording = () => {
	    this.setState({
	      record: false
	    });
	}

	onData(recordedBlob) {
	    // console.log('chunk of real-time data is: ', recordedBlob);
	}

	onStop(recordedBlob) {
	    // console.log('recordedBlob is: ', recordedBlob);
	    this.setState(prevState => ({
	      recordFile: [...prevState.recordFile, recordedBlob.blobURL]
	    }))

	    this.sequencer.updateDrums();
	}

	renderGreyCircles(numCircles){
		let circles = [];
		for (var i = 0; i < 10; i++){
			if (numCircles === i+1 || numCircles > i+1) {
				var bgcolor = "#4df2b0"; //green
			} else {
				bgcolor = "#dbe0de"; //grey
			}
			circles.push(<ProgressDot key={'empty_'+i} completed={bgcolor}/>)
		}
		return circles
	}

	render() {
	    const list = this.state.recordFile.map((item, i) => {
	      return <ReplayButton key={i} file={item} index={i}/>
	    })

	    const empties = this.renderGreyCircles(this.state.recordFile.length)

	    return (
	    	<div>
	    	<Sequencer 
	    		ref={instance => {this.sequencer = instance;}}
	    		recordFile={this.state.recordFile}/>
	        <Record 
	            record={this.state.record}
	            onStop={this.onStop}
	            onData={this.onData} 
	            startRecording={this.startRecording}
	            stopRecording={this.stopRecording}/>
	        <ProgressWrapper>{empties}</ProgressWrapper>
	        {list}
	        
	      </div>
	    );
	}
}

export default Wrapper;
