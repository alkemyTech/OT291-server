const PaymentConstants = require('../constants/payment');
const HttpAdapter = require('../services/HttpAdapter');

class PaymentService {
  static Url = PaymentConstants.MercadoPago;
  static bodySubscription = {
    reason: 'Suscripción a ONG SOMOS MAS',
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      transaction_amount: null,
    },
    back_url: 'https://google.com.ar',
    payer_email: `${process.env.EMAIL_MERCADO_PAGO}`,
  };

  static setBodySubscription(amount, rate_change) {
    PaymentService.bodySubscription.auto_recurring.transaction_amount = amount;
    PaymentService.bodySubscription.auto_recurring.currency_id = rate_change;
    return PaymentService.bodySubscription;
  }

  static async createSubscription(amount, rate_change = 'ARS') {
    try {
      const body = PaymentService.setBodySubscription(amount, rate_change);
      const payment = await HttpAdapter.post(
        PaymentService.Url,
        body,
        process.env.ACCESS_TOKEN_MERCADO_PAGO
      );
      return payment.init_point;
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = PaymentService;
