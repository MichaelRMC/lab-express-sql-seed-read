const db = require("../db/dbConfig.js");

const getAllSongs = async ( Song_id ) =>
{
	try
	{
		const allSongs = await db.any( "SELECT * FROM songs WHERE Song_id=$1", Song_id );
		return allSongs;
	} catch ( err )
	{
		return err;
	}
};

const getOneSong = async ( id ) =>
{
	try {
		const oneSong = await db. one("SELECT * FROM song id=$1", id)
	} catch (err) {
		return err
	}
};

const deleteSong = async ( id ) =>
{
	try
	{
		const deletedSong = await db.one( "DELETE from songs WHERE id = $1 RETURNING *", id );
	} catch ( err )
	{
		return err;
	}
};

const createSong = async ( Song_id, song ) =>
{
	try
	{
		const { name, Song_id, is_favorite } = song;
		const createdSong = await db.one( `INSERT INTO songs (name, Song_id, is_favorite) VALUES ($1, $2, $3) RETURNING *`, [ name, Song_id, is_favorite ] );
		return createdSong;
	} catch ( err )
	{
		return err;
	}
};

const updateSong = async ( song ) =>
{
	try {
		const { name, Song_id, is_favorite, id } = song;
		const updatedSong = await db.one( `UPDATE songs SET name=$1, Song_id=$2, is_favorite=$3 WHERE id=$4 RETURNING *`, [ name, Song_id, is_favorite, id ] );
		return updatedSong
	} catch (err) {
		return err
	}
};

module.exports = {
	getAllSongs,
	getOneSong,
	createSong,
	deleteSong,
	updateSong,
};