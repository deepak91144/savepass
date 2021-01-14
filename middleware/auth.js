var jwt = require("jsonwebtoken");
exports.checkAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		const splitedToken = token.split(" ")[1];

		const decode = jwt.verify(splitedToken, "deepak");
		res.json({
			authenticated: true,
			token: decode,
		});
	} catch (error) {
		res.json({
			authenticated: false,
			err: error,
		});
	}
	next();
};
