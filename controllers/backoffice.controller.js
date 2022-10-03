const { Contact } = require('../models');

class BackofficeController {
  static async getContacts(req, res) {
    try {
      const contacts = await Contact.findAll({
        attributes: ['name', 'phone', 'email', 'message', 'createdAt'],
      });

      if (!contacts) {
        return res.status(404).json({
          msg: 'There is no contacts registered',
        });
      }

      res.write(`
            <table> 
            <tr> 
                <th> Name </th> <th> Phone </th> <th> Email </th> <th> message </th> 
            <tr> 
            `);

      contacts.forEach((contact) => {
        res.write(`<tr>`);
        res.write(`<td>` + contact.name + `</td>`);
        res.write(`<td>` + contact.phone + `</td>`);
        res.write(`<td>` + contact.email + `</td>`);
        res.write(`<td>` + contact.message + `</td>`);

        res.write(`</tr>`);
      });
      res.write(`</table>`);

      res.end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Error while searching in db',
      });
    }
  }
}

module.exports = BackofficeController;
