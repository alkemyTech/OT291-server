const Token = require('../helpers/Token');
const { User, Role } = require('../models');

class ValidatejWtUser {
  static async decryptTokenUser(req, res, next) {
    const decryptToken = Token.decryptJWT(req, res);

    if (!decryptToken || !decryptToken.email) {
      return res.status(401).json('jwt must be provided or invalid');
    }
    const { email } = decryptToken;
    try {
      const user = await User.findOne({
        where: { email },
        attributes: ['firstName', 'lastName', 'email', 'image'],
        include: {
          model: Role,
          as: 'role',
          attributes: ['name'],
        },
      });
      if (!user) {
        return res.status(404).json({ msg: 'Could not find user' });
      }
      if (user.role.name !== 'Standard') {
        return res.status(403).json({ msg: 'unauthorized user' });
      }
      next();
    } catch (error) {
      res.status(404).json({ msg: 'db response error' });
    }
  }
}

module.exports = ValidatejWtUser;
