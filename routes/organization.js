const express = require('express');
const router = express.Router();

const OrganizationController = require('../controllers/organization.js');

router.get('/public', async (req, res, next) => {
  const response = await OrganizationController.showPublicInformation();
  if (response) return res.status(200).json(response);
  else return res.status(404).json({ msg: 'Organization not found' });
});

module.exports = router;
