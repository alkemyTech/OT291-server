const express = require('express');
const router = express.Router();
const verifyRole = require('../middlewares/verify-role');
const ValidationErrors = require('../middlewares/validationErrors');
const organizationSchema = require('../schemas/organization');

const OrganizationController = require('../controllers/organization.js');

router.get('/public', OrganizationController.findOrganization);

router.post(
  '/public',
  verifyRole.isAdminRole,
  organizationSchema,
  ValidationErrors.validateSchema,
  OrganizationController.updateOrganization
);

module.exports = router;
