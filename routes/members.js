const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/member.controller');
const RoleMiddleware = require('../middlewares/verify-role');
const membersByIdSchema = require('../schemas/members');
const ValidationErrors = require('../middlewares/validationErrors');

router.get('/', RoleMiddleware.isAdminRole, MemberController.getMembers);

router.delete(
  '/:id',
  membersByIdSchema,
  ValidationErrors.validateSchema,
  RoleMiddleware.isAdminRole,
  MemberController.deleteMember
);

router.post(
  '/',
  newMemberSchema,
  ValidationErrors.validateSchema,
  MemberController.postNewMember
);

module.exports = router;