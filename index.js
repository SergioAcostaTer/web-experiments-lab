const express = require("express");
const app = express();
const cron = require("node-cron");
const axios = require("axios");
const roomsInfo = require("./playlists");

const Room = require("./Room");

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http").Server(app);
const cors = require("cors");
const ytsr = require("sergio-ytsr");
app.use(cors());

// const socketIO = require("socket.io")(http, {
//   cors: {
//     origin: [
//       "https://random-radio-front.vercel.app",
//       "http://localhost:3000",
//       "http://localhost:5173",
//       "http://192.168.0.30:5173",
//     ],
//   },
// });

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

cron.schedule("*/10 * * * *", () => {
  //make request to keep render alive to
  axios.get("https://random-radio-back.onrender.com/").then((res) => {
    console.log("Stay alive at " + new Date().toISOString());
  });
});

const rooms = [];

for (const roomInfo of roomsInfo) {
  const room = new Room(roomInfo.roomName, roomInfo.spotifyPlaylistID, socketIO);
  rooms.push(room);
}

let users = 0;

socketIO.on("connection", (socket) => {
  console.log(users);
  console.log("User connected");
  users++;
  socketIO.emit("users", users);

  socket.on("newMessage", (message) => {
    console.log("New message:", message);
    socketIO.emit("newMessage", {
      id: socket.id,
      message: message.message,
      user: message.user,
    });
  });

  socket.on("disconnect", () => {
    
    console.log("User disconnected");
    users--;
    socketIO.emit("users", users);
  });
});

app.get("/", (req, res) => {
  const data = rooms.map((room) => {
    return {
      roomName: room?.roomName,
      nowPlaying: room?.musicQueue.song,
      nextSong: room?.musicQueue.nextSong,
    };
  });
  res.json(data);
});

app.get("/:room", (req, res) => {
  const room = req.params.room;
  const roomObj = rooms.find((r) => r.roomName === room);
  res.json({
    nowPlaying: roomObj?.musicQueue.song,
    nextSong: roomObj?.musicQueue.nextSong,
    queue: roomObj?.queueP,
    songs: roomObj?.musicQueue.songs,
  });
});

// app.get("/search/:query", (req, res) => {
//   const query = req.params.query;

//   //search youtube for query, only videos
//   ytsr(query, { limit: 10, type: "video" }).then((result) => {
//     res.json(result.items);
//   });
// });

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
