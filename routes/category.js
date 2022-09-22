const express = require('express');
const router = express.Router();

const CategoriesController=require("../controllers/categories")
const RoleMiddleware=require("../middlewares/verify-role")
router.get('/', RoleMiddleware.isAdminRole ,CategoriesController.getAll);

module.exports = router;
