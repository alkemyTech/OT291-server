const ContactDao = require('../dao/contact');
const HTML = require('../helpers/HTML');

class BackofficeController {
  static async getContacts(req, res) {
    try {
      const attributes = ['name', 'phone', 'email', 'message'];
      const contacts = await ContactDao.getAllContacts(attributes);

      if (!contacts) {
        return res.status(404).json({
          msg: 'There is no contacts registered',
        });
      }

      const htmlTableContact = HTML.generateHtmlTable(contacts, attributes);

      return res.send(htmlTableContact);
    } catch (error) {
      return res.status(500).json({
        msg: 'Error while searching in db',
      });
    }
  }
}

module.exports = BackofficeController;
