const MusicQueue = require("./MusicQueue");

class Room {
  constructor(roomName, spotifyPlaylistID, io) {
    this.roomName = roomName;
    this.io = io;
    this.users = 0;
    this.chatHistory = [];
    this.musicQueue = null;
    this.spotifyPlaylistID = spotifyPlaylistID;

    this.initialize();
  }

  get nowPlaying() {
    return this.musicQueue.song;
  }

  get nextSong() {
    return this.musicQueue.nextSong;
  }

  get queueP() {
    return this.musicQueue.queue;
  }

  get songs() {
    return this.musicQueue.songs;
  }

  initialize() {
    this.setupSockets();
    this.musicQueue = new MusicQueue(
      this.roomName,
      this.spotifyPlaylistID,
      this.io
    );
  }

  setupSockets() {
    const roomNamespace = this.io.of(`/${this.roomName}`);

    roomNamespace.on("connection", (socket) => {
      console.log(`User connected to ${this.roomName}`);

      socket.on("joinRoom", (username) => {
        console.log(`${username} joined ${this.roomName}`);
        this.users++;

        socket.emit("userCount", this.users);
      });

      socket.on("leaveRoom", (username) => {
        console.log(`${username} left ${this.roomName}`);
        this.users--;
        socket.emit("userCount", this.users);
      });

      socket.emit("songDetails", this.musicQueue.song);

      socket.on("newMessage", (message) => {
        console.log("New message:", message);
        roomNamespace.emit("newMessage", {
          user: socket.id,
          message: message.message,
        });
      });

      socket.on("disconnect", () => {

      });
    });
  }
}

module.exports = Room;
