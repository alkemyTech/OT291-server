const express = require('express');
const router = express.Router();

const OrganizationController = require('../controllers/organization.js');

const organizationController = new OrganizationController();

router.get('/public', async (req, res, next) => {
  try {
    const response = await organizationController.showPublicInformation();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
