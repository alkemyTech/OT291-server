const express = require('express');
const router = express.Router();

const CategoryController=require("../controllers/category")
const RoleMiddleware=require("../middlewares/verify-role")
router.get('/', RoleMiddleware.isAdminRole ,CategoryController.getAll);

module.exports = router;
