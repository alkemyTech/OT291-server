const { response } = require('express');
const db = require('../models');
const { User } = db;
const jwt = require('jsonwebtoken');

class RoleMiddleware {
  static async isAdminRole(req, res = response, next) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
      res.status(500).json({
        msg: 'There is no token in request',
      });
    }

    try {
      const { email } = jwt.verify(authToken, process.env.SECRETORPRIVATEKEY);

      const user = await User.findOne({
        where: { email },
        attributes: ['firstname'],
        include: {
          model: Role,
          attributes: ['name'],
        },
      });

      if (!user) {
        return res.json({
          msg: 'user not valid',
        });
      }

      if (user.role.name !== 'Admin') {
        return res.status(401).json({
          msg: `User ${user.firstname} is not an Admin`,
        });
      }
    } catch (err) {
      return res.status(401).json({
        msg: 'token not valid',
      });
    }

    return next();
  }
}

module.exports = RoleMiddleware;
