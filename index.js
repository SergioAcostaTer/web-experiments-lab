const express = require("express");
const app = express();
const cron = require("node-cron");
const axios = require("axios");

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

//multiline comment



const roomsInfo = [
  {
    roomName: "room1",
    spotifyPlaylistID: "37i9dQZF1DXcBWIGoYBM5M",
    title: "Today's Top Hits 🎧"
  },
  {
    roomName: "room2",
    spotifyPlaylistID: "37i9dQZF1DX0XUsuxWHRQd",
    title: "RapCaviar 🎤"
  },
  {
    roomName: "room3",
    spotifyPlaylistID: "37i9dQZF1DX10zKzsJ2jva",
    title: "Viva Latino! 🎉"
  },
  {
    roomName: "room4",
    spotifyPlaylistID: "37i9dQZF1DX4o1oenSJRJd",
    title: "All Out 00s 🎧"
  },
  {
    roomName: "room5",
    spotifyPlaylistID: "37i9dQZEVXbMDoHDwVN2tF",  
    title: "Top 50 Global 🌍"
  },
  {
    roomName: "room6",
    spotifyPlaylistID: "37i9dQZEVXbLRQDuF5jeBp",
    title: "Top 50 EE.UU 🔫"
  },
  {
    roomName: "room7",
    spotifyPlaylistID: "37i9dQZEVXbNFJfN1Vw8d9",
    title: "Top 50 España 🇪🇸🇪🇸"
  },
  {
    roomName: "room8",
    spotifyPlaylistID: "37i9dQZF1DX6XNIZUM3SKi",
    title: "Barça Tour 2023⚽",
  },
  {
    roomName: "room9",    
    spotifyPlaylistID: "07MBp1t71mTJfuJvQpkGbN",
    title: "Full Latinos",
  },
  {
    roomName: "room10",
    spotifyPlaylistID: "0IepDN73Y0GDNBycm63Ewx",
    title: "RULETA ESCOPETA 🔫🥖",
  },
  {
    roomName: "room11",
    spotifyPlaylistID: "37i9dQZF1DWWMOmoXKqHTD",
    title: "Songs to Sing in the Car 🚗🎶",
  },
  {
    roomName: "room12",
    spotifyPlaylistID: "37i9dQZF1DX0BcQWzuB7ZO",
    title: "Dance Hits 🕺",
  }
];


const room1 = new Room(roomsInfo[0].roomName, roomsInfo[0].spotifyPlaylistID, socketIO);
const room2 = new Room(roomsInfo[1].roomName, roomsInfo[1].spotifyPlaylistID, socketIO);
const room3 = new Room(roomsInfo[2].roomName, roomsInfo[2].spotifyPlaylistID, socketIO);
const room4 = new Room(roomsInfo[3].roomName, roomsInfo[3].spotifyPlaylistID, socketIO);
const room5 = new Room(roomsInfo[4].roomName, roomsInfo[4].spotifyPlaylistID, socketIO);
const room6 = new Room(roomsInfo[5].roomName, roomsInfo[5].spotifyPlaylistID, socketIO);
const room7 = new Room(roomsInfo[6].roomName, roomsInfo[6].spotifyPlaylistID, socketIO);
const room8 = new Room(roomsInfo[7].roomName, roomsInfo[7].spotifyPlaylistID, socketIO);
const room9 = new Room(roomsInfo[8].roomName, roomsInfo[8].spotifyPlaylistID, socketIO);
const room10= new Room(roomsInfo[9].roomName, roomsInfo[9].spotifyPlaylistID, socketIO);
const room11= new Room(roomsInfo[10].roomName, roomsInfo[10].spotifyPlaylistID, socketIO);
const room12= new Room(roomsInfo[11].roomName, roomsInfo[11].spotifyPlaylistID, socketIO);

const rooms = [room1, room2, room3, room4, room5, room6, room7, room8, room9, room10, room11, room12];

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
