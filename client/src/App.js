import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import LandingPage from "./components/LandingPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect("https://localhost:5000");
  }

  getUserHandler = e => {
    this.socket.emit("get-users");
  };

  render() {
    return (
      <div className="App">
        <h1>Feedback App</h1>
        <Router>
          <div>
            <button>
              <Link to="/teacher/">Teacher</Link>
            </button>
            <button>
              <Link to="/student/">Student</Link>
            </button>

            <div style={{ background: "white", padding: "10px" }}>
              <Route
                path="/"
                exact
                render={() => <LandingPage socket={this.socket} />}
              />
              <Route
                path="/student/"
                render={() => <Student socket={this.socket} />}
              />
              <Route
                path="/teacher/"
                render={() => <Teacher socket={this.socket} />}
              />
            </div>
          </div>
        </Router>
        <button onClick={this.getUserHandler}>Get active users</button>
      </div>
    );
  }
}

export default App;
