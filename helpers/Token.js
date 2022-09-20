const jwt = require('jsonwebtoken');

class Token {
  static generateJWT(email) {
    return new Promise((resolve, reject) => {
      const payload = { email };

      jwt.sign(
        payload,
        process.env.SECRETORPRIVATEKEY,
        {
          expiresIn: '4h',
        },
        (err, token) => {
          if (err) {
            reject('No fue posible generar el JWT');
          } else {
            resolve(token);
          }
        }
      );
    });
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
