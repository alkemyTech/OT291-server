const { request, response } = require('express');
const ContactDao = require('../dao/contact');
const { Contact } = require('../models/');
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

  static async getContacts(req = request, res = response) {
    try {
      const contacts = await Contact.findAll({
        attributes: ['name', 'phone', 'email', 'message', 'createdAt'],
      });

      if (!contacts) {
        return res.status(404).json({
          msg: 'There is no contacts registered',
        });
      }

      return res.status(200).json({
        contacts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Error while searching in db',
      });
    }
  }
}

module.exports = ContactController;
