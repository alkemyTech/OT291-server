const { response } = require('express');
const { User } = require('../models');
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
      const { email } = Token.decryptJWT(authToken);

      const user = await User.findOne({
        where: { email },
        attributes: ['id', 'firstName'],
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

      if (user.Role.name === 'Admin') {
        req.email = email;
        return next();
      }

      if (user.id !== req.params.id) {
        return res.status(403).json({
          msg: 'id not valid',
        });
      }
    } catch (error) {
      return res.status(500).json({
        msg: 'token/user not valid',
      });
    }

    return next();
  }

  static async isAdminRole(req, res = response, next) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
      res.status(500).json({
        msg: 'There is no token in request',
      });
    }

    try {
      const { email } = Token.decryptJWT(authToken);

      const user = await User.findOne({
        where: { email },
        attributes: ['firstName'],
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
          msg: `User ${user.firstname} is not an Admin`,
        });
      }
      req.email = email;
    } catch (err) {
      return res.status(401).json({
        msg: 'token not valid',
      });
    }

    return next();
  }
}

module.exports = RoleMiddleware;
