const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const allMiddleware = require("../middleware/allmidd");
const { check, validationResult } = require("express-validator");
const categoryController = require("../controller/category");
const userController = require("../controller/userController");
const router = express.Router();
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
router.post(
	"/category/add",
	[check("category", "category minimum two character").isLength({ min: 2 })],
	categoryController.addCategory
);
router.get("/categories", categoryController.getAllCategories);
router.get("/category/delete/:id", categoryController.deleteCategory);
router.put("/category/update/:id", categoryController.updateCategory);
module.exports = router;
