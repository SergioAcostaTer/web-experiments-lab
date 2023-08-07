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
app.get("/test", async (req, res) => {
  const resp = await urlStatusCode("https://rr5---sn-4g5lzne6.googlevideo.com/videoplayback?expire=1691384894&ei=3ifQZM7IKZmvgQeM-YPoCA&ip=3.125.183.140&id=o-AMU1MPEHmIptVZ6ld7fbvUJMYtjo7zLkQxgFawSubnlk&itag=251&source=youtube&requiressl=yes&mh=0V&mm=31%2C26&mn=sn-4g5lzne6%2Csn-5hne6nzd&ms=au%2Conr&mv=m&mvi=5&pl=17&gcr=de&initcwndbps=252500&spc=UWF9f7qKVSLZ3PqDIKf0Hhl6TYdeYgKswWoDyEV_DQ&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=Za7LIpeoCJB7N-ELaXU0ZWkP&gir=yes&clen=4317062&dur=231.761&lmt=1691249584607372&mt=1691362887&fvip=3&keepalive=yes&fexp=24007246&c=WEB&txp=6308224&n=-VjGh0yfUIVuDg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgWDhjkzb9DcYhwaGdEMfToorZorBNMkvePBa_2b-tPSMCIQDAL0qMEqzE1i2UG7b17NOeRoZXKCsSNoStrhtWaByU8A%3D%3D&sig=AOq0QJ8wRgIhAMJgNlktA3eTNwT_4vEk5VElCQkBvw8-oR9jhwrQ1f9TAiEA4p0Fy8KIF1DVBWAghiHxdTmWW1BmqN4ox6RGSvyxQR4%3D"
  );
  console.log(resp);
  res.json(resp);
  
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
