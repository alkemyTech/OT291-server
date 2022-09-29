const express = require('express');
const router = express.Router();
const RoleMiddleware = require('../middlewares/verify-role');
const MemberController = require('../controllers/member.controller');



router.delete('/:id', 
    RoleMiddleware.isAdminRole, 
    MemberController.deleteMember
)

module.exports = router;