const { response } = require('express');
const { User, Role, Comment } = require('../models');
const Token = require('../helpers/Token');
const UserDao = require('../dao/user');

class RoleMiddleware {
  static async checkValidUser(req, res) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
      return res.status(400).json({ msg: 'There is not token in the request' });
    }
    try {
      const { email } = Token.decryptJWT(req, res);
      const user = await UserDao.findOneUser({ email }, ['id', 'firstName'], {
        model: Role,
        attributes: ['name'],
      });
      return user ? user : { msg: 'User not valid' };
    } catch (error) {
      return { msg: 'Token or user not valid' };
    }
  }

  static async isOwner(req, res, next) {
    const { id } = req.params;
    try {
      const user = await RoleMiddleware.checkValidUser(req, res);
      return (
        (user.Role.name === 'Admin' && next()) || (user.id === id && next())
      );
    } catch (error) {
      res.status(400).json({ msg: 'User not valid' });
    }
  }

  static async isAdminRole(req, res, next) {
    try {
      const adminUser = await RoleMiddleware.checkValidUser(req, res);
      return adminUser?.Role?.name === 'Admin'
        ? next()
        : res.status(400).json({ msg: 'Invalid user or not an admin' });
    } catch (error) {
      return error;
    }
  }

  static async handleComments(req, res, next) {
    const { id } = req.params;
    let comment, user;
    try {
      user = await RoleMiddleware.checkValidUser(req);
      if (user?.Role?.name === 'Admin') return next();
    } catch (error) {
      return error;
    }
    try {
      comment = await Comment.findByPk(id);
      return !comment
        ? res.status(404).json({ msg: 'Could not find a comment' })
        : comment && user.id === comment.user_id
        ? next()
        : res.status(400).json({
            msg: `User is not comment owner or not an admin`,
          });
    } catch (error) {
      return error;
    }
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
        msg: 'Eror while searching USER in db',
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
      return res.status(500).json({
        msg: 'Eror while searching USER in db',
      });
    }
  }
}

module.exports = RoleMiddleware;
