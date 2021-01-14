const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const auth = require("../middleware/auth");
const allMiddleware = require("../middleware/allmidd");
const { check, validationResult } = require("express-validator");
var multer = require("multer");
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	},
});
var upload = multer({ storage: storage });
const categoryController = require("../controller/category");
const userController = require("../controller/userController");
const userModel = require("../model/user");
const router = express.Router();
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
router.post(
	"/signup",
	upload.single("image"),
	allMiddleware.checkEmail,
	[
		check("name", "minimum 3 character").isLength({ min: 3 }),
		check("email", "invalid email format").isEmail(),
		check("password", "minimum 5 character").isLength({ min: 5 }),
	],

	userController.signup
);
router.post("/signin", userController.signin);
router.get("/profile", auth.checkAuth, userController.profile);
module.exports = router;
