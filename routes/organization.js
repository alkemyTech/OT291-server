const express = require('express');
const router = express.Router();

const OrganizationController = require('../controllers/organization.js');

router.get('/public', OrganizationController.findOrganization);

module.exports = router;
