const express = require('express');
const MemberController = require('../controllers/member.controller');
const RoleMiddleware = require('../middlewares/verify-role');
const router = express.Router();

router.get('/', RoleMiddleware.isAdminRole, MemberController.getMembers);

module.exports = router;
