const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userModel = require("../model/user");
exports.signup = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json(errors.mapped());
	} else {
		try {
			const userDetails = req.body;
			userDetails.password = await bcrypt.hash(userDetails.password, 10);
			if (req.file) {
				userDetails.image = req.file.path;
			}
			const user = new userModel(userDetails);
			const createdUser = await user.save();
			if (createdUser) {
				res.status(201).json({
					msg: "user created successfully",
					user: createdUser,
				});
			}
		} catch (error) {
			res.status(401).json({
				err: error,
			});
		}
	}
};
exports.signin = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const user = await userModel.findOne({ email: email });
	if (user) {
		const isMatchedPassword = await bcrypt.compare(password, user.password);

		if (isMatchedPassword) {
			var token = jwt.sign({ userId: user._id }, "deepak", { expiresIn: "1h" });
			res.json({
				token: token,
			});
		} else {
			res.status(401).json({
				err: "invalid email or password",
			});
		}
	} else {
		res.status(401).json({
			err: "invalid email or password",
		});
	}

	// res.json(user);
};
exports.profile = () => {
	res.json({
		data: "this is profile",
	});
};
