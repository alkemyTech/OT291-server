const MapperResponse = require('../utils/formatResponse');
const { Contact } = require('../models/');
class ContactDao {
  static async createContact(body) {
    try {
      const contactData = await Contact.create(body);
      const result = MapperResponse.cleanDataDb(contactData);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ContactDao;
