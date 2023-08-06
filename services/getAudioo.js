// ./services/getAudio.js
const ytdl = require("ytdl-core");
const axios = require("axios");

async function getAudio(id) {
  try {
    const info = await ytdl.getInfo(id);
    //only audio and get the highest audio quality
    const format = ytdl.chooseFormat(info.formats, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    const clientId = "fd6bc481d430442c8011a48589db01a1";
    const clientSecret = "386d6f3cf16b4c538a909319a8d58034";
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

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
      `https://api.spotify.com/v1/search?q=${`${info.videoDetails.title} ${info.videoDetails.ownerChannelName}`}&type=track&limit=20&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${spotifyToken?.access_token}`,
        },
      }
    );

    console.log(`${info.videoDetails.title} ${info.videoDetails.ownerChannelName}`);

    return {
      url: format.url,
      duration: info.videoDetails.lengthSeconds,
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      cover: responseSearch.data.tracks.items[0].album.images[0].url,
    };
  } catch (error) {
    console.error("Error fetching audio:", error.message);
    throw error; // Rethrow the error for the caller to handle
  }
}

module.exports = {
  getAudio,
};
