// ./services/getAudio.js
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");

async function getAudio(name, artists, cover, spotifyDuration) {
  const searchResults = await ytsr(name, { limit: 10, safeSearch: false });

  const convertToSeconds = (duration) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const differences = searchResults.items.map((object, index) => {
    if (!object.duration) {
      // console.log(`Object at index ${index} doesn't have a duration.`);
      return Infinity; // Set a high difference for invalid objects
    }
  
    const objectDuration = convertToSeconds(object.duration);
    return Math.abs(spotifyDuration - objectDuration);
  });
  

  const indexOfClosest = differences.indexOf(Math.min(...differences));

  const video = searchResults.items[indexOfClosest];

  const videoInfo = await ytdl.getInfo(video.url);

  const format = ytdl.chooseFormat(videoInfo.formats, {
    filter: "audioonly",
    quality: "highestaudio",
  });

  const audioDetails = {
    name: name,
    artists: artists.map((artist) => artist.name) ,
    url: format.url,
    duration: videoInfo.videoDetails.lengthSeconds,
    cover: cover,
    currentTime: 0,
  };

  return audioDetails;
}

module.exports = {
  getAudio,
};
