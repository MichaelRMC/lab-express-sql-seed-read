const db = require("../db/dbConfig.js");

const getAllAlbums = async () => {
	try {
		const allAlbums = await db.any("SELECT * FROM albums");
		return allAlbums;
	} catch (error) {
		return error;
	}
};

const getOneAlbum = async (id) => {
	try {
		const oneAlbum = await db.one("SELECT * FROM albums WHERE id=$1", id);
		return oneAlbum;
	} catch (error) {
		return error;
	}
};

const createAlbum = async (album) => {
	try {
		const newAlbum =
			const {album_name, artist} = album
			await db.one(
			"INSERT INTO albums (album_name, artist) VALUES($1, $2) RETURNING *",
			[album_name, artist]
		);
		return newAlbum;
	} catch (error) {
		return error;
	}
};

const deleteAlbum = async (id) => {
	try {
		const deletedAlbum = await db.one(
			"DELETE FROM albums WHERE id =$1 RETURNING *",
			id
		);
		return deletedAlbum;
	} catch (error) {
		return console.error(error);
	}
};

const updateAlbum = async (id, album) => {
	try
	{
		const { album_name, artist } = album;
		const updatedAlbum = await db.one(
			"UPDATE albums SET album_name=$1, artist=$2,  WHERE id=$3 RETURNING *",
			[album_name, artist, id]
		);
		return updatedAlbum;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getAllAlbums,
	getOneAlbum,
	createAlbum,
	deleteAlbum,
	updateAlbum
};
