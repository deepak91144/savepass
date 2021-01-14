const mongoose = require("mongoose");
const passwordSchema = mongoose.Schema(
	{
		password: {
			type: String,
			required: true,
			trim: true,
		},
		projectname: {
			type: String,
		},
		passworddetails: {
			type: String,
			required: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "category",
			required: true,
		},
	},
	{ timestamps: true }
);
const passwordModel = mongoose.model("password", passwordSchema);
module.exports = passwordModel;
