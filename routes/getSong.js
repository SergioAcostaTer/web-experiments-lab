//getSong

const express = require("express");

const router = express.Router();

const { getAudio } = require("../services/getAudio");

router.get("/getSong/:id", async (req, res) => {
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
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20&offset=0`,
    {
      headers: {
        Authorization: `Bearer ${spotifyToken?.access_token}`,
      },
    }
  );

  getAudio(req.params.id).then((url) => {
    res.json({
      url,
    });
  });
});

module.exports = router;
