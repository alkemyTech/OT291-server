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
  /**
   * Asynchronously return all contacts from the database (table Contacts)
   * @param {string[]} attributes - Attributes we need Ej: ['email', 'phone']
   *
   * @returns {Array}
   */
  static async getAllContacts() {}
}

module.exports = ContactDao;
