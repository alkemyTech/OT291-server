const { response } = require('express');
const { User, Role, Comment } = require('../models');
const Token = require('../helpers/Token');

class RoleMiddleware {
  static async isOwner(req, res = response, next) {
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
        attributes: ['id', 'firstName'],
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

      if (user.Role.name === 'Admin') {
        return next();
      }

      if (user.id !== parseInt(req.params.id)) {
        return res.status(400).json({ msg: 'User not valid' });
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
  static async isOwnerOfComment(req, res, next) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
      return res.status(500).json({
        msg: 'There is no token in request',
      });
    }

    const idComment = parseInt(req.params.id);
    let userDecrypted, user, comment;

    try {
      userDecrypted = Token.decryptJWT(req, res);
      user = await User.findOne({
        where: { email: userDecrypted.email },
        attributes: ['id', 'firstName'],
        include: {
          model: Role,
          attributes: ['name'],
        },
      });

      if (!user) {
        return res.status(400).json({
          msg: 'User not valid',
        });
      }
    } catch (error) {
      return res.status(500).json({
        msg: 'Error while searching USER in db',
      });
    }

    try {
      comment = await Comment.findOne({
        where: { id: idComment },
        attributes: ['user_id'],
      });
      if (!comment) {
        return res.status(404).json({
          msg: 'Comment not fount',
        });
      }
      if (user.Role.name === 'Admin') {
        return next();
      }
      if (user.id === comment.user_id) {
        return next();
      }

      return res.status(400).json({
        msg: 'User not owner of comment ',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
        msg: 'Eror while searching Comment in db',
      });
    }
  }
}

module.exports = RoleMiddleware;
