const { validationResult } = require("express-validator");
const categoryModel = require("../model/category");
const passwordModel = require("../model/password");

exports.addPassword = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json(errors.mapped());
		}
		const passworddetails = req.body;
		const password = new passwordModel(passworddetails);
		const newPassword = await password.save();
		await categoryModel.findOneAndUpdate(
			{ _id: passworddetails.category },
			{ $inc: { password: 1 } }
		);
		res.status(201).json({
			msg: "new password added",
			password: newPassword,
		});
	} catch (error) {
		res.status(201).json({
			err: error,
		});
	}
};
exports.getAllPassword = async (req, res) => {
	try {
		const password = await passwordModel
			.find()
			.populate("category", "category");
		res.status(201).json({
			msg: "ok",
			password: password,
		});
	} catch (error) {
		res.status(201).json({
			err: errors,
		});
	}
};
exports.deletePassword = async (req, res) => {
	try {
		const passwordId = req.params.id;
		const deletedPassword = await passwordModel.findOneAndDelete({
			_id: passwordId,
		});
		await categoryModel.findOneAndUpdate(
			{ _id: deletedPassword.category._id },
			{ $inc: { password: -1 } }
		);
		res.status(201).json({
			msg: "password successfully deleted",
			deletedPassword: deletedPassword,
		});
	} catch (error) {
		res.status(201).json({
			err: error,
		});
	}
};
exports.updatePassword = async (req, res) => {
	try {
		const passwordId = req.params.id;
		const passworddetails = req.body;
		const updatedPassword = await passwordModel.findOneAndUpdate(
			{ _id: passwordId },
			passworddetails,
			{ new: true }
		);
		return res.status(201).json({
			msg: "password successfully updated ",
			updatedPassword: updatedPassword,
		});
	} catch (error) {
		res.status(201).json({
			err: console.error(),
		});
	}
};
