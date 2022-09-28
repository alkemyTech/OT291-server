const { response } = require('express');
const { User, Role } = require('../models');
const Token = require('../helpers/Token');

class RoleMiddleware {
  static async isOwner(req, res = response, next) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
      res.status(500).json({
        msg: 'There is no token in request',
      });
    }

    try {
      const { email } = Token.decryptJWT(req, res);
      const user = await User.findOne({
        where: { email },
        attributes: ['id', 'firstName'],
        include: [
          {
            model: Role,
            attributes: ['name'],
          },
        ],
      });

      if (!user) {
        return res.json({
          msg: 'user not valid',
        });
      }

      if (user.Role.name === 'Admin') {
        return next();
      }

      if (user.id !== req.params.id) {
        return res.status(400).json({ msg: 'User not valid' })
      }

      return next();

    } catch (error) {
      return res.status(500).json({
        msg: 'token/user not valid',
      });
    }
  }

  static async isAdminRole(req, res = response, next) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
      return res.status(500).json({
        msg: 'There is no token in request',
      });
    }

    try {
      const { email } = Token.decryptJWT(req, res);

      const user = await User.findOne({
        where: { email },
        attributes: ['firstName', 'lastName', 'email', 'image'],
        include: [
          {
            model: Role,
            through: {
              attributes: ['name'],
            },
          },
        ],
      });

      if (!user) {
        return res.json({
          msg: 'user not valid',
        });
      }

      if (user.Role.name !== 'Admin') {
        return res.status(401).json({
          msg: `User ${user.firstName} is not an Admin`,
        });
      }
    } catch (error) {
      return res.status(401).json({
        msg: 'token not valid',
      });
    }

    return next();
  }
}

module.exports = RoleMiddleware;
