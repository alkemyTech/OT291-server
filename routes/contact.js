const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contacts');
const ValidationErrors = require('../middlewares/validationErrors');
const RoleMiddleware = require('../middlewares/verify-role');
const { createContactSchema } = require('../schemas/contact');

router.post(
  '/',
  createContactSchema,
  ValidationErrors.validateSchema,
  RoleMiddleware.isAdminRole,
  ContactController.createContact
);

router.get('/', RoleMiddleware.isAdminRole, ContactController.getContacts);

module.exports = router;
