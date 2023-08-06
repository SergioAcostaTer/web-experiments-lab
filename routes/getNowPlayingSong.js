//getNowPlayingSong.js

const { getAudio } = require("../services/getAudio");
const express = require("express");
const router = express.Router();

router.get("/getNowPlayingSong/", (req, res) => {
    getAudio("vxB0amY8BWs").then((url) => {
        res.json({
        url,
        seconds: 50,
        });
    });
    }
);

module.exports = router;