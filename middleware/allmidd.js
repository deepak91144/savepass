const userModel = require("../model/user");

exports.checkEmail = async (req, res, next) => {
	const user = await userModel.findOne({ email: req.body.email });
	if (user) {
		res.json({
			err: "email already exist",
		});
	}
	next();
};
