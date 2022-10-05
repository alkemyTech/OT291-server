const ContactDao = require('../dao/contact');
const NotifyViaEmail = require('../services/notifyViaEmail');

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
      await NotifyViaEmail.sendEmail(email,"Hemos registrado tus datos con éxito",`Hola ${name} te agradecemos por registrar tus datos, pronto nos pondremos en contacto contigo.`)
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
      res.status(200).json(contacts);
    } catch (error) {
      res.status(404).json({ msg: 'Contacts not found' });
    }
  }
}

module.exports = ContactController;
