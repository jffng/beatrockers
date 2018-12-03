import React, { Component } from 'react';
import styled from 'styled-components';
import { ReactMic } from 'react-mic';

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

class Record extends Component {
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
        console.log('recordedBlob is: ', recordedBlob);
        this.setState(prevState => ({
          recordFile: [...prevState.recordFile, recordedBlob.blobURL]
        }))
    }

    renderGreyCircles(numCircles){
        let circles = [];
        for (var i = 0; i < 10; i++){
            let bgcolor;
            if (numCircles === i+1 || numCircles > i+1) {
                bgcolor = "#4df2b0"; //green
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
							<ProgressWrapper>{empties}</ProgressWrapper>
            {list}
          </div>
        );
    }
}

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

export default Record;
