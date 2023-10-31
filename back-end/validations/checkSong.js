const checkName = (req, res, next) => {
	if (req.body.name) {
		console.log("Name: Verified");
		next();
	} else
	{
		console.log( req.body );
		console.log(req.body.name);
		res.status(400).json({ Error: "Name is required" });
	}
};

const checkArtist = (req, res, next) => {
	if (req.body.artist) {
		console.log("Artist: Verified");
		next();
	} else {
		res.status(400).json({ Error: "Artist is required" });
	}
};

const checkBoolean = (req, res, next) => {
	if (req.body.is_favorite == "true" || req.body.is_favorite == "false") {
		next();
	} else {
		res.status(400).json({ Error: "is_favorite must be a boolean value" });
	}
};

module.exports = { checkArtist, checkBoolean, checkName };
