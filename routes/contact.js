const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contacts');
const ValidationErrors = require('../middlewares/validationErrors');
const { createContactSchema } = require('../schemas/contact');
const verifyRole = require('../middlewares/verify-role');

router.post(
  '/',
  createContactSchema,
  ValidationErrors.validateSchema,
  ContactController.createContact
);

router.get(
  '/backoffice',
  verifyRole.isAdminRole,
  ContactController.getContacts
);

module.exports = router;
