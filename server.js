require('dotenv').config();
connectDB = require('./db')

const express = require("express");
var socket = require("socket.io");

const app = express();

app.set("port", process.env.PORT || 5000);

var server = app.listen(app.get("port"), () => {
  console.log("listening to request on ", app.get("port"));
});

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

/*---- MONGODB CONNECTION ----*/
connectDB();
/*------------------*/

// User data
let users = [];

// Socket setup
var io = socket(server);

let connectCounter = 0;

io.on("connection", socket => {
  console.log("made socket connection", socket.id);


  socket.on("enterRoom", function(room, isAdmin) {
    socket.join(room);
    console.log(io.nsps["/"].adapter.rooms[room]);
    users.push({
      userId: socket.id,
      value: 5,
      room: parseInt(room),
      role: isAdmin ? "teacher" : "student"
    });
  });

  connectCounter++;
  console.log("Active connected users:", connectCounter);

  socket.on("disconnect", function() {
    connectCounter--;
    console.log("Active connected users: ", connectCounter);
    users = users.filter(user => user.userId !== socket.id);
  });

  socket.on("slider-value", data => {
    users.map(user =>
      user.userId === data.uid ? (user.value = data.value) : ""
    );
  });

  socket.on("get-users", function() {
    console.log(users);
  });

  socket.on("createRoom", data => {
    socket.join(data);
    io.emit("createdRoom", data);
  });

  socket.on("getRoomSnapshot", data => {
    const usersInRoom = users.filter(user => {
      return user.room == data;
    });
    io.emit("usersInRoom", usersInRoom);
  });
});

