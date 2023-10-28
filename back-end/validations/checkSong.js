const checkName = (req, res, next) => {
	const { name } = req.body;
	if (name) {
		console.log("Name: Verified");
		return next();
	} else {
		res.status(400).json({ Error: "Name is required" });
	}
};

const checkArtist = (req, res, next) => {
	const { artist } = req.body;
	if (artist) {
		console.log("Artist: Verified");
		return next();
	} else {
		res.status(400).json({ Error: "Artist is required" });
	}
};

const checkBoolean = (req, res, next) => {
	const { is_favorite } = req.body;
	if (
		is_favorite == "true" ||
		is_favorite == "false" ||
		is_favorite == undefined ||
		typeof is_favorite == "boolean"
	) {
		next();
	} else {
		res.status(400).json({ Error: "is_favorite requires a boolean value" });
	}
};

module.exports = { checkArtist, checkBoolean, checkName };
