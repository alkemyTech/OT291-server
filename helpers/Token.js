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

  static decryptJWT(authToken) {
    const response = jwt.verify(authToken, process.env.SECRETORPRIVATEKEY)
    return response;
  }
}

module.exports = {
  Token,
};
