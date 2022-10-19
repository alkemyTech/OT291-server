class paymentServices {
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
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      });
      return payment.data.init_point;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = paymentServices;
