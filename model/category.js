const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
	{
		category: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);
const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
