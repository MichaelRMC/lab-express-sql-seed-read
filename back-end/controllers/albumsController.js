const express = require( "express" );
const {
	getAllAlbums,
	getOneAlbum,
	createAlbum,
	deleteAlbum,
	updateAlbum,
} = require("../queries/albums.js");
const albums = express.Router();

albums.get("/", async (req, res) => {
	const allAlbums = await getAllAlbums();
	if (allAlbums[0]) {
		res.status(200).json(allAlbums);
	} else {
		res.status(500).json({ error: "Server Error" });
	}
});

albums.get("/:id", async (req, res) => {
	const { id } = req.params;
	const Album = await getOneAlbum(id);
	if (Album) {
		res.json(Album);
	} else {
		res.status(404).json({ error: "Not Found" });
	}
});

albums.post("/", async (req, res) => {
	try {
		const newAlbum = await createAlbum(req.body);
		res.json(newAlbum);
	} catch (error) {
		res.status(400).json({ error: "An error has occurred" });
	}
});

albums.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const deletedAlbum = await deleteAlbum(id);
	if (deletedAlbum.id) {
		res.status(200).json(deletedAlbum);
	} else {
		res.status(404).json("Album Not Found!");
	}
});

albums.put("/:id", async (req, res) => {
	const { id } = req.params;
	const updatedAlbum = await updateAlbum(id, req.body);
	res.status(200).json(updatedAlbum);
});