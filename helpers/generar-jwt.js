const jwt = require('jsonwebtoken');

const generarJWT = (email) => {
  return new Promise((resolve, reject) => {
    const payload = {email};

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          console.log(err)
          reject('No fue posible generar el JWT');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
    generarJWT
}
