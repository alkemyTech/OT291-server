const { Order } = require('../models');
const MapperResponse = require('../utils/formatResponse');
class OrderDao {
  static async createOrder(body) {
    try {
      const data = await Order.create(body);
      const format = MapperResponse.cleanDataDb(data);
      return format;
    } catch (error) {
      throw new Error('Ocurrió un error al crear la orden');
    }
  }
}

module.exports = OrderDao;
