const db = require('../models');
const { createUser } = require('../services/user');

class UserController {
  async post(req, res) {
    try {
      const user = await createUser(req.body);
      res.send({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
