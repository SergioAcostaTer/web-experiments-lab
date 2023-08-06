const express = require("express");
const app = express();
const cron = require("node-cron");
require("dotenv").config();

const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http").Server(app);
const cors = require("cors");
const Room = require("./Room");
const { getAudio } = require("./services/getAudio");
app.use(cors());


// const socketIO = require("socket.io")(http, {
//   cors: {
//     origin: ["http://192.168.56.1:5173", "http://192.168.1.133:5173", "https://random-radio-front.vercel.app"],
//   },
// });

const socketIO = require("socket.io")(http, {
  cors: {
    orign: "*",
  },
});


cron.schedule("*/10 * * * *", () => {
  //make request to keep render alive to

  fetch("https://college-api-hkwu.onrender.com/api")
    .then((res) => res.text())
    .then((body) => console.log(`${body} ${new Date()}`));
});

// 07MBp1t71mTJfuJvQpkGbN
// 0VrX5i1GIjHzqXelLP3pfH
// 0IepDN73Y0GDNBycm63Ewx

// const queue = new MusicQueue("2Nq3zgeZXuGKbexb4xnLlf", socketIO); // Pass the socketIO instance here

const room1 = new Room("room1", "0VrX5i1GIjHzqXelLP3pfH", socketIO);
const room2 = new Room("room2", "07MBp1t71mTJfuJvQpkGbN", socketIO);
const room3 = new Room("room3", "0IepDN73Y0GDNBycm63Ewx", socketIO);
const room4 = new Room("room4", "0IepDN73Y0GDNBycm63Ewx", socketIO);
const room5 = new Room("room5", "0IepDN73Y0GDNBycm63Ewx", socketIO);
const room6 = new Room("room6", "0IepDN73Y0GDNBycm63Ewx", socketIO);

const rooms = [room1, room2, room3, room4, room5, room6];


app.get("/api", (req, res) => {
  const data = rooms.map((room) => {
    return {
      roomName: room.roomName,
      nowPlaying: room.nowPlaying,
      nextSong: room.nextSong,
    };
  });
  res.json(data);
});

app.get("/api/:room", (req, res) => {
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
