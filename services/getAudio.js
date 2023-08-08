const ytdl = require("ytdl-core");
const ytsr = require("sergio-ytsr");
const { getColorFromURL } = require("color-thief-node");
const streamToBlob = require("stream-to-blob");


async function getAudio(name, artists, cover, spotifyDuration) {
  //check performance

  const t0 = performance.now();


  const searchResults = await ytsr(`${name} ${artists[0].name}`, { limit: 10, type: "video", safeSearch: false })
  
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

  // const stream = await ytdl(audio.url, {
  //   format: "mp3",
  //   quality: "highestaudio",
  //   });

  //   const blob = await streamToBlob(stream);
  // const base64 = await blob.arrayBuffer().then((buffer) => {
  //   return Buffer.from(buffer).toString("base64");
  // });

  const audioInfo = await ytdl.getInfo(audio.url);

  const audioFormat = ytdl.chooseFormat(audioInfo.formats, {
    quality: "highestaudio",
  });

  const audioUrl = audioFormat.url;


  const colors = await getColorFromURL(cover);

  const colorHEX = colors
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("");

  const colorRGB = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;


  const audioDetails = {
    name: name,
    artists: artists.map((artist) => artist.name),
    // url: `data:audio/mpeg;base64,${base64}`,
    url: audioUrl,
    duration: audio.duration,
    cover: cover,
    currentTime: 0,
    colors: {
      hex: colorHEX,
      rgb: colorRGB,
    },
  };

  const t1 = performance.now();

  console.log("Call to getAudio took " + (t1 - t0) + " milliseconds.");

  return audioDetails;
}

module.exports = {
  getAudio,
};
