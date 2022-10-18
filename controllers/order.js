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
        const body = await PaymentService.createSubscription(amount);
        const user = await UserDao.findOneUser({ email: data.email });
        console.log(user.id, 'asdasd');
        res.status(200).send(body);
      } catch (error) {
        console.log(error);
        res.status(402).send('Ocurrió un problema al hacer la subscripción');
      }
    }
  }
}

module.exports = OrderController;
