const { getAudio } = require("./services/getAudio");
const axios = require("axios");

class MusicQueueeee {
  constructor(SpotifyPlaylistID, socketIO) {
    this.queue = [];
    this.songs = [];
    this.currentSong = 0;
    this.spotifyPlaylistID = SpotifyPlaylistID;
    this.socketIO = socketIO;
    
    this.clientId = "fd6bc481d430442c8011a48589db01a1";
    this.clientSecret = "386d6f3cf16b4c538a909319a8d58034";
    
    this.initialize();
  }

  async initialize() {
    try {
      await this.getPlaylistSongs();
      await this.loadInitialSongDetails();
      this.simulatePlayback();
    } catch (error) {
      console.error("Error initializing:", error);
    }
  }

  async getPlaylistSongs() {
    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
      
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const spotifyToken = response.data;

      const responseSearch = await axios.get(
        `https://api.spotify.com/v1/playlists/${this.spotifyPlaylistID}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyToken?.access_token}`,
          },
        }
      );

      this.queue = responseSearch.data.tracks.items.map((item) => {
        return {
          name: item.track.name,
          artists: item.track.artists,
          id: item.track.id,
          cover: item.track.album?.images[0]?.url,
          spotifyDuration: parseInt(item.track.duration_ms / 1000),
        };
      });
    } catch (error) {
      console.error("Error fetching playlist songs:", error);
      throw error;
    }
  }

  async loadInitialSongDetails() {
    if (this.queue.length > 0) {
      await this.loadSong(this.queue[0]);
      await this.loadSong(this.queue[1]);
    }
  }

  async loadSong(song) {
    try {
      const audio = await getAudio(song.name, song.artists, song.cover, song.spotifyDuration);
      this.songs.push({
        ...song,
        ...audio,
      });
    } catch (error) {
      console.error("Error loading song details:", error);
    }
  }

  get song() {
    return this.songs[this.currentSong];
  }

  get nextSong() {
    return this.songs[this.currentSong + 1];
  }

  loadSongDetailsForNext() {
    if (this.songs.length - this.currentSong < 3) {
      this.loadSong(this.queue[this.currentSong + 1]);
    }
  }

  playNextSong() {
    if (this.currentSong < this.songs.length - 1) {
      this.currentSong++;
      this.socketIO.emit("songDetails", this.song);
      this.loadSongDetailsForNext();
      console.log(`Now playing: ${this.song.name}`);
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
          this.playNextSong();
        }
      }
    }, 1000);
  }

}

module.exports = MusicQueueeee;
