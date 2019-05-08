import React from "react";

export default class Student extends React.Component {
  constructor(props) {
    super(props);
    this.roomInputValue = React.createRef();
    this.state = {
      currentRoom: null
    }
  }

  handleSlider = e => {
    const sliderValue = e.target.value;
    const user = {
      uid: this.props.socket.id,
      value: sliderValue
    };
    this.props.socket.emit("slider-value", user);
  };

  enterRoom = e => {
    e.preventDefault();
    const roomInput = this.roomInputValue.current.value;
    this.props.socket.emit("enterRoom", roomInput, false);
    this.setState({
      currentRoom: roomInput
    });
  };

  render() {
    return (
      <div>
        <h2>Student</h2>
        <form onSubmit={this.enterRoom}>
          <input ref={this.roomInputValue} type="text" />
          <button>Join Room</button>
        </form>
        {(this.state.currentRoom !== null) 
          ? (
            <div className="current-room-container" style={{background:"black",color:"white",padding:"10px",margin:"10px"}}>
              <h2>Welcome to room {this.state.currentRoom}</h2>
              <form>
                <input onChange={this.handleSlider} type="range" max="10" min="0" />
              </form>
            </div>)
          : ""}
        <div id="Output" />
      </div>
    );
  }
}
