const PaymentConstants = require('../constants/payment');
const PaymentService = require('../services/paymentService');
const Token = require('../helpers/Token');
const OrderDao = require('../dao/order');
const UserDao = require('../dao/user');

class OrderController {
  static PaymentCategory = PaymentConstants.category;
  static async createOrder(req, res) {
    const { category, amount, userEmail } = req.body;
    const data = await Token.decryptJWT(req);
    console.log(data);
    if (category === OrderController.PaymentCategory.recurrent) {
      try {
        const paymentLink = await PaymentService.createSubscription(amount);
        const user = await UserDao.findOneUser({ email: data.email });
        await OrderDao.createOrder({
          category,
          amount,
          paymentLink,
          user_id: user.id,
        });
        res.status(200).json(paymentLink);
      } catch (error) {
        res.status(402).send(error.message);
      }
    }
  }
}

module.exports = OrderController;
