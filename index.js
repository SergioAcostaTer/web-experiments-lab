const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http").Server(app);
const cors = require("cors");
const Room = require("./Room");
app.use(cors());


const socketIO = require("socket.io")(http, {
  cors: {
    origin: ["http://192.168.56.1:5173", "http://192.168.1.133:5173"],
  },
});

// 07MBp1t71mTJfuJvQpkGbN
// 0VrX5i1GIjHzqXelLP3pfH
// 0IepDN73Y0GDNBycm63Ewx

// const queue = new MusicQueue("2Nq3zgeZXuGKbexb4xnLlf", socketIO); // Pass the socketIO instance here

const room1 = new Room("room1", "0VrX5i1GIjHzqXelLP3pfH", socketIO);
const room2 = new Room("room2", "07MBp1t71mTJfuJvQpkGbN", socketIO);
const room3 = new Room("room3", "0IepDN73Y0GDNBycm63Ewx", socketIO);

// socketIO.on("connection", (socket) => {
//   console.log("A user connected");
//   actualUsers++;
//   socketIO.emit("actualUsers", actualUsers);

//   // const sendMessage = (e) => {
//   //   e.preventDefault();

//   //   socket.emit("newMessage", {
//   //     message,
//   //     id: socket.id,
//   //   });

//   //   setMessage("");
//   // };


//   socket.on("disconnect", () => {
//     actualUsers--;
//     socketIO.emit("actualUsers", actualUsers);
//     console.log("A user disconnected");
//   });
// });

app.get("/api", (req, res) => {
  res.json({
    room1: {
      nowPlaying: room1.nowPlaying,
      nextSong: room1.nextSong,
    },
    room2: {
      nowPlaying: room2.nowPlaying,
      nextSong: room2.nextSong,
    },
    room3: {
      nowPlaying: room3.nowPlaying,
      nextSong: room3.nextSong,
    },
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
