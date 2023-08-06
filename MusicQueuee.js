const { getAudio } = require("./services/getAudio");
const socketInstance = require("./middlewares/socketInstance");

const io = socketInstance.getIo();

class MusicQueuee {
  constructor(youtubeIds, socketIO) {
    this.queue = youtubeIds;
    this.currentSong = 0;
    this.songs = [];
    this.loadInitialSongDetails(); // Load details for initial songs
    this.simulatePlayback();
    this.socketIO = socketIO;
  }

  async loadInitialSongDetails() {
    for (let i = 0; i < 2; i++) {
      await this.loadSongDetails(this.queue[i]);
    }
  }

  async loadSongDetails(id) {
    try {
      const audioDetails = await getAudio(id);
      this.songs.push({
        id,
        url: audioDetails.url,
        duration: audioDetails.duration,
        title: audioDetails.title,
        thumbnail: audioDetails.thumbnail,
        currentTime: 0,
        cover: audioDetails.cover,
      });
    } catch (error) {
      console.error(`Failed to load details for ${id}:`, error);
    }
  }

  get song() {
    return this.songs[this.currentSong];
  }

  get nextSong() {
    return this.songs[this.currentSong + 1];
  }

  playNextSong() {
    if (this.currentSong < this.songs.length - 1) {
      this.currentSong++;

      this.socketIO.emit("songDetails", this.song);

      if (this.songs.length - this.currentSong < 3) {
        this.loadSongDetails(this.queue[this.currentSong + 1]);
      }

      console.log(`Now playing: ${this.song.title}`);
    } else {
      console.log("No more songs in the queue.");
    }
  }

  simulatePlayback() {
    setInterval(() => {
      const currentSong = this.song;
      if (currentSong) {
        currentSong.currentTime += 1;
        if (currentSong.currentTime >= currentSong.duration) {
          this.playNextSong(); // Move to the next song when the current one is finished
        }
      }
    }, 1000);
  }
  //when song starts playing socket emits song details
}

module.exports = MusicQueuee;
