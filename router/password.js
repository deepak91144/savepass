const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const allMiddleware = require("../middleware/allmidd");
const { check, validationResult } = require("express-validator");
const categoryController = require("../controller/category");
const userController = require("../controller/userController");
const passwordController = require("../controller/password");
const router = express.Router();
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
router.post(
	"/password/add",
	[
		check("password", "password must be minimum five character").isLength({
			min: 3,
		}),
		check(
			"passworddetails",
			"password must be minimum five character"
		).isLength({
			min: 3,
		}),
		check("category", "category is required").notEmpty(),
	],
	passwordController.addPassword
);
router.get("/password", passwordController.getAllPassword);
router.delete("/password/delete/:id", passwordController.deletePassword);
router.put("/password/update/:id", passwordController.updatePassword);
module.exports = router;
