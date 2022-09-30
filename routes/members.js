const express = require('express');
const router = express.Router();
const RoleMiddleware = require('../middlewares/verify-role');
const MemberController = require('../controllers/member.controller');
const membersByIdSchema = require('../schemas/members');
const ValidationErrors = require('../middlewares/validationErrors');

router.delete('/:id', 
    membersByIdSchema,
    ValidationErrors.validateSchema,
    RoleMiddleware.isAdminRole, 
    MemberController.deleteMember
)

module.exports = router;