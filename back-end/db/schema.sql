DROP DATABASE IF EXISTS songs_dev;
CREATE DATABASE songs_dev;

\c songs_dev;

CREATE TABLE albums (
	id SERIAL PRIMARY KEY,
	album_name TEXT,
	artist TEXT,
	ON DELETE CASCADE
);

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 album_id INT REFERENCES album(id)
 time TEXT,
 is_favorite BOOLEAN
);

