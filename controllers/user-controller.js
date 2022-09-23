const { User } = require('../models');
const bcrypt = require('bcrypt');

class UserController {

  static async post(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(
          password,
          Number.parseInt(process.env.AUTH_ROUNDS)
        ),
      });
      const response = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    const { id } = req.params;
    const  body  = req.body;
    try {
      const updateUser = await User.findByPk(id);
      if(updateUser)      
        {
          await updateUser.update(body)
          res.status(200).json({ msg: 'User update successfully' })
        }else {
          res.status(404).json({ msg: 'Could not find user' });
        }
    } catch (error) {
      next(error);
    }
  }  

  static async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const userDeleted = await User.destroy({
        where: { id },
      });
      userDeleted
        ? res.status(200).json({ msg: 'User deleted successfully' })
        : res.status(404).json({ msg: 'Could not find user' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
