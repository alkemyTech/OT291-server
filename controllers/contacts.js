const ContactDao = require('../dao/contact');
class ContactController {
  static async createContact(req, res) {
    try {
      const { name, email, phone, message } = req.body;
      const contactData = await ContactDao.createContact({
        name,
        email,
        phone: phone ?? null,
        message: message ?? null,
      });
      return res.status(201).json(contactData);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = ContactController;
