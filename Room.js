const { Server } = require("socket.io");
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
    console.log(`Created namespace: ${this.roomName}`);

    roomNamespace.on("connection", (socket) => {
      console.log(`Users in ${this.roomName}: ${this.users}`);

      socket.emit("songDetails", this.musicQueue.song);

      // Handle user sending chat message
      socket.on("newMessage", (message) => {
        roomNamespace.emit("newMessage", {
          user: socket.id,
          message: message.message,
        });
      });

      // Handle user disconnecting from the room
      socket.on("disconnect", () => {
        console.log(`Users in ${this.roomName}: ${this.users}`);
        console.log(`User disconnected from room: ${this.roomName}`);
      });
    });
  }
}

module.exports = Room;
