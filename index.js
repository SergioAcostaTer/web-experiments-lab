const express = require("express");
const app = express();
const cron = require("node-cron");
require("dotenv").config();

const Room = require("./Room");

const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http").Server(app);
const cors = require("cors");
const urlStatusCode = require("url-status-code");
app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: [
      "https://random-radio-front.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173",
      "http://192.168.0.30:5173", 
    ],
  },
});

cron.schedule("*/10 * * * *", () => {
  //make request to keep render alive to
  axios.get("https://random-radio-back.onrender.com/");
});

const room1 = new Room("room1", "4ZKbjyAVy4CXfe0R6pMhVf", socketIO);
const room2 = new Room("room2", "07MBp1t71mTJfuJvQpkGbN", socketIO);
const room3 = new Room("room3", "0IepDN73Y0GDNBycm63Ewx", socketIO);
const room4 = new Room("room4", "37i9dQZEVXbLRQDuF5jeBp", socketIO);
const room5 = new Room("room5", "37i9dQZEVXbMDoHDwVN2tF", socketIO);
const room6 = new Room("room6", "37i9dQZEVXbNFJfN1Vw8d9", socketIO);

const rooms = [room1, room2, room3, room4, room5, room6];

app.get("/", (req, res) => {
  const data = rooms.map((room) => {
    return {
      roomName: room.roomName,
      nowPlaying: room.nowPlaying,
      nextSong: room.nextSong,
    };
  });
  res.json(data);
});

app.get("/:room", (req, res) => {
  const room = req.params.room;
  const roomObj = rooms.find((r) => r.roomName === room);
  res.json({
    nowPlaying: roomObj.nowPlaying,
    nextSong: roomObj.nextSong,
    queue: roomObj.queueP,
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
