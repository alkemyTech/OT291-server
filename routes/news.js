const express = require('express');
const router = express.Router();

const NewsController = require('../controllers/news.js');
const VerifyType = require("../middlewares/verifyType")
const VerifyRole = require("../middlewares/verify-role")
router.get('/:id',VerifyRole.isAdminRole,VerifyType.VerifyId,NewsController.findById);

module.exports = router;
