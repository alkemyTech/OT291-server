const express = require('express');
const router = express.Router();
const BackofficeController = require('../controllers/backoffice.controller');
const verifyRole = require('../middlewares/verify-role');

router.get(
  '/contacts',
  verifyRole.isAdminRole,
  BackofficeController.getContacts
);

module.exports = router;
