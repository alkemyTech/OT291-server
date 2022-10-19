const PaymentConstants = require('../constants/payment');
const HttpAdapter = require('../services/HttpAdapter');
const axios = require('axios');

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
    payer_email: '',
  };

  static setBodySubscription(amount, rate_change, userEmail) {
    PaymentService.bodySubscription.auto_recurring.transaction_amount = amount;
    PaymentService.bodySubscription.auto_recurring.currency_id = rate_change;
    PaymentService.bodySubscription.payer_email = userEmail;
    return PaymentService.bodySubscription;
  }

  static async createSubscription(amount, rate_change = 'ARS', userEmail) {
    try {
      const body = PaymentService.setBodySubscription(
        amount,
        rate_change,
        userEmail
      );
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

  static async createPayment(email, ammount) {
    try {
      const url = 'https://api.mercadopago.com/checkout/preferences';
      const body = {
        payer_email: email,
        items: [
          {
            title: 'Donación única',
            description: 'Gracias por tu donación.',
            picture_url: 'https://placehold.co/32',
            category_id: 'singleDonation',
            quantity: 1,
            unit_price: ammount,
          },
        ],
        back_urls: {
          failure: '/failure',
          pending: '/pending',
          success: '/success',
        },
      };
      const payment = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ACCESS_TOKEN_MERCADO_PAGO}`,
        },
      });
      return payment.data.init_point;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = PaymentService;
