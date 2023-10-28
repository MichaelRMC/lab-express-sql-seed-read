const express = require("express");
const cors = require("cors");
const songs = require("../back-end/controllers/songController");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/songs", songs);

app.get("/", (req, res) => {
	res.send("Welcome to Tuner!");
});

app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});

module.exports = app;
