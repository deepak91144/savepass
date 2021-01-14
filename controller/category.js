const { validationResult } = require("express-validator");
const categoryModel = require("../model/category");

exports.addCategory = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json(errors.mapped());
		}
		const categoryDetails = req.body;
		const category = new categoryModel(categoryDetails);
		const newCategory = await category.save();
		res.status(201).json({
			msg: "category added",
			category: newCategory,
		});
	} catch (error) {
		res.status(401).json({
			err: error,
		});
	}
};
exports.getAllCategories = async (req, res) => {
	try {
		const allCategories = await categoryModel.find();
		res.json({
			msg: "ok",
			categories: allCategories,
		});
	} catch (error) {
		res.json({
			err: error,
		});
	}
};
exports.deleteCategory = async (req, res) => {
	try {
		const categoryId = req.params.id;
		const deletedCategory = await categoryModel.findOneAndDelete({
			_id: categoryId,
		});
		if (deletedCategory) {
			return res.status(203).json({
				msg: "category deleted successfully",
				deletedCtaegory: deletedCategory,
			});
		}
	} catch (error) {
		res.json(401).json({
			er: error,
		});
	}
};
// update category
exports.updateCategory = async (req, res) => {
	try {
		const categoryId = req.params.id;
		const categoryDetails = req.body;
		const updatedCategory = await categoryModel.findOneAndUpdate(
			{
				_id: categoryId,
			},
			categoryDetails,
			{ new: true }
		);
		if (updatedCategory) {
			return res.json({
				msg: "category updated successfuly",
				updateCategory: updatedCategory,
			});
		}
	} catch (error) {
		return res.json({
			err: error,
		});
	}
};
