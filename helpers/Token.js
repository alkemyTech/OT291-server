const jwt = require('jsonwebtoken');
const {sign} = require('jsonwebtoken');

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

  static decryptJWT(req, res) {
    try {
      const authorization = req.get('Authorization');
      let token = '';

      if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
      }

      const decodeToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

      if (!token || !decodeToken.email) {
        res.status(401);
      }

      return decodeToken;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  Token,
};
