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

  static async getContacts(req, res) {
    const { name, phone, email, message } = req.body;

    try {
      const contacts = await ContactDao.getAllContacts([
        'name',
        'phone',
        'email',
        'message',
      ]);

    } catch (error) {
      res.status(404).json({ msg: 'Contacts not found' })
    }
  }
}

module.exports = ContactController;
