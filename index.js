const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");
const roomsInfo = require("./playlists");
const Room = require("./Room");

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const socketIO = require("socket.io")(http, {
  cors: {
    origin: ["https://random-radio-front.vercel.app", "http://localhost:5173"],
  },
});

cron.schedule("*/10 * * * *", async () => {
  try {
    const response = await axios.get("https://random-radio-back.onrender.com/");
    console.log("Stay alive at " + new Date().toISOString());
  } catch (error) {
    console.error("Error keeping render alive:", error);
  }
});

const rooms = [];

for (const roomInfo of roomsInfo) {
  const { roomName, spotifyPlaylistID } = roomInfo;
  const room = new Room(roomName, spotifyPlaylistID, socketIO);
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
      color: message.color,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    users--;
    socketIO.emit("users", users);
  });
});

app.get("/", (req, res) => {
  const data = rooms.map((room) => ({
    roomName: room?.roomName,
    nowPlaying: room?.musicQueue.song,
    nextSong: room?.musicQueue.nextSong,
  }));
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

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
