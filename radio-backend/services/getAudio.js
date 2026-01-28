const ytsr = require("sergio-ytsr");
const { getPaletteFromURL } = require("color-thief-node");

async function getAudio(name, artists, cover, spotifyDuration) {
  
  const t0 = Date.now();

  const searchResults = await ytsr(`${name} ${artists[0].name}`, {
    limit: 10,
    type: "video",
    safeSearch: false,
  });

  const convertToSeconds = (duration) => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const differences = searchResults.items.map((object) => {
    if (!object.duration) {
      return Infinity; // Set a high difference for invalid objects
    }

    object.duration = convertToSeconds(object.duration);
    return Math.abs(spotifyDuration - object.duration);
  });

  const indexOfClosest = differences.indexOf(Math.min(...differences));

  const { url, duration } = searchResults.items[indexOfClosest];

  const palette = await getPaletteFromURL(cover, 3);

  const colorPalette = palette.map((color) => ({
    hex: `#${color.map((c) => c.toString(16).padStart(2, "0")).join("")}`,
    rgb: `rgb(${color.join(", ")})`,
  }));

  const audioDetails = {
    name: name,
    artists: artists.map(({ name }) => name),
    duration: duration,
    cover: cover,
    currentTime: 0,
    colors: colorPalette,
    url: url,
  };

  const t1 = Date.now();
  console.log("getAudio took", t1 - t0, "milliseconds");

  return audioDetails;
}

module.exports = {
  getAudio,
};
