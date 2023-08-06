// ./services/getAudio.js
const ytdl = require("ytdl-core");
const ytsr = require("sergio-ytsr");
const { default: axios } = require("axios");

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
  
    object.duration = convertToSeconds(object.duration);
    return Math.abs(spotifyDuration - object.duration);
  });


  const indexOfClosest = differences.indexOf(Math.min(...differences));

  const audio = searchResults.items[indexOfClosest];

  const audioInfo = await ytdl.getInfo(audio.url);

  const onlyAudio = audioInfo.formats.filter((file) => file.mimeType.includes("audio"));
  const orderedByBitrate = onlyAudio.sort((a, b) => b.bitrate - a.bitrate);

  let url = orderedByBitrate[0].url;

  try{
    const response = await axios.head(url);
    if(response.status !== 200 || response.status === 403){
      url = orderedByBitrate[1].url;
    }

  }catch(err){
    console.log(err);
  }


  const audioDetails = {
    name: name,
    artists: artists.map((artist) => artist.name) ,
    url: url,
    duration: audioInfo.videoDetails.lengthSeconds,
    cover: cover,
    currentTime: 0,
  };

  return audioDetails;
}

module.exports = {
  getAudio,
};
