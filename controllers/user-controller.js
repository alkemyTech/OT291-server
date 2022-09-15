const { User } = require('../models');

class UserController {
  async deleteUser(id) {
    const userDeleted = await User.destroy({
      where: { id },
    });
  }
}

module.exports = UserController;
