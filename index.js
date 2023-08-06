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
    ],
  },
});

cron.schedule("*/10 * * * *", () => {
  //make request to keep render alive to
  axios.get("https://random-radio-back.herokuapp.com/");
});

const room1 = new Room("room1", "0VrX5i1GIjHzqXelLP3pfH", socketIO);
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
app.get("/test", async (req, res) => {
  urlStatusCode("https://rr5---sn-1gi7znes.googlevideo.com/videoplayback?expire=1691383827&ei=syPQZKPTLqK76dsPvvCb2As&ip=3.75.158.163&id=o-AIGGTaVwmA-AfBfW-Nr5rSMKXesd6JsfE4qA3mNap2aE&itag=251&source=youtube&requiressl=yes&mh=PY&mm=31%2C26&mn=sn-1gi7znes%2Csn-5hnednsz&ms=au%2Conr&mv=u&mvi=5&pl=22&spc=UWF9f930gSzMrgWfQd9KEpQjsAfwqrTmGue2uP4Hyw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=k3Hte6C7ZPSrSTT6dQC0WpgP&gir=yes&clen=3576132&dur=203.201&lmt=1609104793865308&mt=1691361155&fvip=2&keepalive=yes&fexp=24007246%2C51000011%2C51000023&c=WEB&txp=5531432&n=HKNyxEZ_RTh9-w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AG3C_xAwRQIgIbToLLbYGAhrSiSGvGJWW8cSa7hv4e6dr_TaUNb0XusCIQD27g5lQnfE0lbalAbdTqDbWRLF26jVXGgSraqohS_-Cw%3D%3D&sig=AOq0QJ8wRQIhAPY2XhrU_0MDFjJgiM9pMOepxf9U_usIogm3jctkordMAiB-eqECWuVraXLboz-6CtQTupe1zytPOfijUZk-dX_xcA%3D%3D", (error, statusCode) => {
    if (error) {
      console.error(error)
      res.json({error})
    } else {
      console.log(statusCode)
      res.json({statusCode, error: null})
    }
  })
});
// app.get("/:room", (req, res) => {
//   const room = req.params.room;
//   const roomObj = rooms.find((r) => r.roomName === room);
//   res.json({
//     nowPlaying: roomObj.nowPlaying,
//     nextSong: roomObj.nextSong,
//     queue: roomObj.queueP,
//   });
// });

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
