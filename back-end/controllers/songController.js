const express = require("express");
const {
	getAllSongs,
	getOneSong,
	createSong,
	deleteSong,
	updateSong,
} = require("../queries/songs.js");
const songs = express.Router({ mergeParams: true });
const {
	checkName,
	checkArtist,
	checkBoolean,
} = require("../validations/checkSong.js");
const { getOneAlbum } = require("../queries/albums.js");
const {
	getAllSongs,
	getOneSong,
	createSong,
	deleteSong,
	updateSong,
} = require("../queries/songs.js");

songs.get("/", async (req, res) => {
	const { album_id } = req.params;
	try {
		const album = await getOneAlbum(album_id);
		const allSongs = await getAllSongs(album_id);
		res.json({ ...album, allSongs });
	} catch (err) {
		res.json(err);
	}
});

songs.get("/:song_id", async (req, res) => {
	const { song_id, album_id } = req.params;
	try {
		const song = await getOneSong(song_id);
		const album = await getOneAlbum(album_id);
		if (song.id) {
			res.json({ ...album, song });
		}
	} catch (err) {
		res.json(err);
	}
} );

songs.post("/", async (req, res) => {
	try {
		const { album_id } = req.params;
		const createdSong = await createSong(album_id, req.body);
		res.json(createdSong);
	} catch (err) {
		res.status(400).json({ error: "An error has occurred" });
	}
} );

songs.delete("/:song_id", async (req, res) => {
	try {
		const { song_id } = req.params;
		const deletedSong = await deleteSong(song_id);

		if (deletedSong) {
			res.status(200).json({"Song deleted!"});
		} else {
			res.status(404).json("Song not found!");
		}
	} catch (err) {
		res.send(err);
	}
} );

songs.put("/:id", async (req, res) => {
    const { id, album_id} = req.params;
    const updatedSong = await updateSong( {album_id, id, ...req.body} );
    if(updatedSong.id) {
        res.status(200).json(updatedSong)
    } else {
        res.status(404).json("Song not found!")
    }

})

module.exports = songs;
