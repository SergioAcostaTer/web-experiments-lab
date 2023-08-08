const express = require("express");
const app = express();
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

const Room = require("./Room");

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http").Server(app);
const cors = require("cors");
const ytsr = require("sergio-ytsr");
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
  axios.get("https://random-radio-back.onrender.com/").then((res) => {
    console.log("Stay alive at " + new Date().toISOString());
  });
});


//multiline comment

/*

const roomsInfo = [
  {
    roomName: "room1",
    spotifyPlaylistID: "4ZKbjyAVy4CXfe0R6pMhVf",
    title: "Just Testing",
  },
  {
    roomName: "room2",    
    spotifyPlaylistID: "07MBp1t71mTJfuJvQpkGbN",
    title: "Full Latinos",
  },
  {
    roomName: "room3",
    spotifyPlaylistID: "0IepDN73Y0GDNBycm63Ewx",
    title: "RULETA ESCOPETA 🔫🥖",
  },
  {
    roomName: "room4",
    spotifyPlaylistID: "37i9dQZEVXbLRQDuF5jeBp",
    title: "Top 50 EE.UU 🔫"
  },
  {
    roomName: "room5",
    spotifyPlaylistID: "37i9dQZEVXbMDoHDwVN2tF",  
    title: "Top 50 Global 🌍"
  },
  {
    roomName: "room6",
    spotifyPlaylistID: "37i9dQZEVXbNFJfN1Vw8d9",
    title: "Top 50 España 🇪🇪🇸🇪🇸"


*/

const room1 = new Room("room1", "4Wmggq0IBu8ZPHyjt2rLdL", socketIO);
const room2 = new Room("room2", "07MBp1t71mTJfuJvQpkGbN", socketIO);
const room3 = new Room("room3", "0IepDN73Y0GDNBycm63Ewx", socketIO);
const room4 = new Room("room4", "37i9dQZEVXbLRQDuF5jeBp", socketIO);
const room5 = new Room("room5", "37i9dQZEVXbMDoHDwVN2tF", socketIO);
const room6 = new Room("room6", "37i9dQZEVXbNFJfN1Vw8d9", socketIO);

const rooms = [room1, room2, room3, room4, room5, room6];

app.get("/", (req, res) => {
  const data = rooms.map((room) => {
    return {
      roomName: room?.roomName,
      nowPlaying: room?.musicQueue.songMin,
      nextSong: room?.musicQueue.nextSongMin,
    };
  });
  res.json(data);
});

app.get("/:room", (req, res) => {
  const room = req.params.room;
  const roomObj = rooms.find((r) => r.roomName === room);
  res.json({
    nowPlaying: roomObj?.musicQueue.songMin,
    nextSong: roomObj?.musicQueue.nextSongMin,
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
