const ytsr = require("sergio-ytsr");
const { getPaletteFromURL } = require("color-thief-node");

async function getAudio(name, artists, cover, spotifyDuration) {
  console.time("getAudio");

  const searchResults = await ytsr(`${name} ${artists[0].name}`, {
    limit: 10,
    type: "video",
    safeSearch: false,
  });

  const convertToSeconds = (duration) => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return Math.abs(minutes * 60 + seconds);
  };

  const spotifyDurationInSeconds = convertToSeconds(spotifyDuration);

  const differences = searchResults.items.map((object) => {
    if (!object.duration) {
      return Infinity; // Set a high difference for invalid objects
    }

    object.duration = convertToSeconds(object.duration);
    return Math.abs(spotifyDurationInSeconds - object.duration);
  });

  const indexOfClosest = differences.indexOf(Math.min(...differences));

  const { url } = searchResults.items[indexOfClosest];

  const palette = await getPaletteFromURL(cover, 3);

  const colorPalette = palette.map((color) => ({
    hex: `#${color.map((c) => c.toString(16).padStart(2, "0")).join("")}`,
    rgb: `rgb(${color.join(", ")})`,
  }));

  const audioDetails = {
    name: name,
    artists: artists.map(({ name }) => name),
    duration: audio.duration,
    cover: cover,
    currentTime: 0,
    colors: colorPalette,
    url: url,
  };

  console.timeEnd("getAudio");

  return audioDetails;
}

module.exports = {
  getAudio,
};
