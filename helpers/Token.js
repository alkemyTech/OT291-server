const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { sign } = require('jsonwebtoken');

class Token {
  static generateJWT(email) {
    try {
      const payload = { email };

      const token = sign(payload, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h',
      });

      return token;
    } catch (error) {
      throw error;
    }
  }

  static decryptJWT(req, res, next) {
    try {
      const authorization = req.get('Authorization');
      let token = '';

      if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
      }

      const decodeToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

      return decodeToken;
    } catch (error) {
      return error;
    }
  }
}

module.exports = {
  Token,
};