const ytdl = require("ytdl-core");
const ytsr = require("sergio-ytsr");
const { getColorFromURL } = require("color-thief-node");


async function getAudio(name, artists, cover, spotifyDuration) {
  const searchResults = await ytsr(name, { limit: 10, safeSearch: false });

  const convertToSeconds = (duration) => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const differences = searchResults.items.map((object, index) => {
    if (!object.duration) {
      return Infinity; // Set a high difference for invalid objects
    }

    object.duration = convertToSeconds(object.duration);
    return Math.abs(spotifyDuration - object.duration);
  });

  const indexOfClosest = differences.indexOf(Math.min(...differences));

  const audio = searchResults.items[indexOfClosest];

  const audioInfo = await ytdl.getInfo(audio.url);

  const onlyAudio = audioInfo.formats.filter((file) =>
    file.mimeType.includes("audio")
  );

  if (onlyAudio.length === 0) {
    console.error("No audio formats available:", name);
    return null;
  }

  const colors = getColorFromURL(cover);
    

  const orderedByBitrate = onlyAudio.sort((a, b) => b.bitrate - a.bitrate);

  const url = orderedByBitrate[0].url;

  const audioDetails = {
    name: name,
    artists: artists.map((artist) => artist.name),
    url: url,
    duration: audioInfo.videoDetails.lengthSeconds,
    cover: cover,
    currentTime: 0,
    colors: colors,
  };

  return audioDetails;
}

module.exports = {
  getAudio,
};
