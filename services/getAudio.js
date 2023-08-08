const ytsr = require("sergio-ytsr");
const { getColorFromURL, getPaletteFromURL } = require("color-thief-node");


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


  const palette = await getPaletteFromURL(cover, 3);


  let colorPalette = palette.map((color) => {
    return {
      hex: `#${color.map((c) => c.toString(16).padStart(2, "0")).join("")}`,
      rgb: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
    };
  });

  const audioDetails = {
    name: name,
    artists: artists.map((artist) => artist.name),
    duration: audio.duration,
    cover: cover,
    currentTime: 0,
    colors: colorPalette,
    url: audio.url, 
  };

  const t1 = performance.now();

  console.log("Call to getAudio took " + (t1 - t0) + " milliseconds.");

  return audioDetails;
}

module.exports = {
  getAudio,
};
