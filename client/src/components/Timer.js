import React from "react";
import ms from "pretty-ms";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      dataOverTime:[]
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }
  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    });
    this.timer = setInterval(
      () =>
        this.setState({
          time: Date.now() - this.state.start
        }),
      1
    );
    this.checkValue = setInterval(
      () =>
      this.setState({
        dataOverTime: [...this.state.dataOverTime, {
          x: Math.floor((this.state.time)/1000),
          y: this.props.currentAverageScore
        }]  
      }),
      1000
    );

  }
  stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
    clearInterval(this.checkValue);
  }
  resetTimer() {
    this.setState({ time: 0, isOn: false });
  }
  render() {
    let start =
      this.state.time == 0 ? (
        <button onClick={this.startTimer}>start</button>
      ) : null;
    let stop =
      this.state.time == 0 || !this.state.isOn ? null : (
        <button onClick={this.stopTimer}>stop</button>
      );
    let resume =
      this.state.time == 0 || this.state.isOn ? null : (
        <button onClick={this.startTimer}>resume</button>
      );
    let reset =
      this.state.time == 0 || this.state.isOn ? null : (
        <button onClick={this.resetTimer}>reset</button>
      );
    return (
      <div>
        {this.props.currentAverageScore !== null ? <h3>{this.props.currentAverageScore}</h3> : "" }
        <h3>timer: ms({this.state.time})</h3>
        {start}
        {resume}
        {stop}
        {reset}
        <ul>
          {this.state.dataOverTime.map(data => {return <li>y:{data.y}, x:{data.x}</li>})}
        </ul>
      </div>
    );
  }
}

export default Timer;
