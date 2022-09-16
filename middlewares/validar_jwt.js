const { Request, Response, NextFunction } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = async (
  req = Request,
  res = Response,
  next = NextFunction
) => {
  try {
    const authorization = req.get('Authorization');
    let token = '';

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
    }

    const decodeToken = await jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    if (!token || !decodeToken.email) {
      res.status(401).json({ msg: 'token missing or invalid' });
    }

    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = {
  validarJWT,
};
