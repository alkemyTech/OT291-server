const express = require('express');
const router = express.Router();
const verifyRole = require('../middlewares/verify-role');

const MemberController = require('../controllers/member.controller');

router.get('', verifyRole.isAdminRole, MemberController.getMembers);

module.exports = router;
