const express = require("express");
const songs = express.Router();
const {
	checkName,
	checkArtist,
	checkBoolean
} = require("../validations/checkSong.js");
const { getAllSongs, getOneSong, createSong } = require("../queries/songs");

songs.get("/", async (req, res) => {
	const allSongs = await getAllSongs();
	if (allSongs[0]) {
		res.status(200).json(allSongs);
	} else {
		res.status(500).json({ Error: "Server Error" });
	}
});

songs.post("/", checkName, checkArtist, checkBoolean, async (req, res) => {
	try {
	const newSong = await createSong(req.body);
	res.json(song);
	} catch (error) {
		res.status(400).json({Error: "An error has occurred"})
	}
});

songs.get("/:id", async (req, res) => {
	const { id } = req.params;
	const song = await getOneSong(id);
	if (song) {
		res.json(song);
	} else {
		res.status(404).json({ Error: "Not Found" });
	}
});

module.exports = songs;
