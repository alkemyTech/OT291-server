const express = require('express');
const router = express.Router();
const verifyRole = require('../middlewares/verify-role');
const ValidationErrors = require('../middlewares/validationErrors');
const organizationSchema = require('../schemas/organization');

const OrganizationController = require('../controllers/organization.js');
const RoleMiddleware = require('../middlewares/verify-role');

router.get('/public', OrganizationController.findOrganization);

router.post(
  '/public',
  verifyRole.isAdminRole,
  organizationSchema,
  ValidationErrors.validateSchema,
  OrganizationController.updateOrganization
);

router.get('/users', RoleMiddleware.isAdminRole ,OrganizationController.getUsersList)

module.exports = router;
