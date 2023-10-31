const express = require("express");
const {
	getAllSongs,
	getOneSong,
	createSong,
	deleteSong,
	updateSong,
} = require("../queries/songs.js");
const {
	checkName,
	checkArtist,
	checkBoolean,
} = require("../validations/checkSong.js");
const songs = express.Router();

songs.get("/", async (req, res) => {
	const allSongs = await getAllSongs();
	if (allSongs[0]) {
		res.status(200).json(allSongs);
	} else {
		res.status(500).json({ error: "Server Error" });
	}
});

songs.get("/:id", async (req, res) => {
	const { id } = req.params;
	const song = await getOneSong(id);
	if (song) {
		res.json(song);
	} else {
		res.status(404).json({ error: "Not Found" });
	}
});

songs.post("/", checkName, checkArtist, checkBoolean, async (req, res) => {
	try {
		const newSong = await createSong(req.body);
		res.json(newSong);
	} catch (error) {
		res.status(400).json({ error: "An error has occurred" });
	}
});

songs.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const deletedSong = await deleteSong(id);
	if (deletedSong.id) {
		res.status(200).json(deletedSong);
	} else {
		res.status(404).json("Song Not Found!");
	}
});

songs.put("/:id", checkName, checkArtist, checkBoolean, async (req, res) => {
	const { id } = req.params;
	const updatedSong = await updateSong(id, req.body);
	res.status(200).json(updatedSong);
});

module.exports = songs;
