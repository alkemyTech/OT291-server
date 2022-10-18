const express = require('express');
const router = express.Router();
const RoleMiddleware = require('../middlewares/verify-role-user');
const orderSchema = require('../schemas/order');
const ValidationErrors = require('../middlewares/validationErrors');
const OrderController = require('../controllers/order');

router.post(
  '/',
  RoleMiddleware.decryptTokenUser,
  orderSchema.orderSchema,
  ValidationErrors.validateSchema,
  OrderController.createOrder
);

module.exports = router;
