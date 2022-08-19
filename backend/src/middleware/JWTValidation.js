const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const JWTValidation = (req = request, res = response, next) => {
  try {
    const token = req.header('x-token');
    if (!token) {
      return res.status(400).json({
        ok: false,
        msg: 'No hay token en la petición.',
      });
    }

    // verificar token
    const payload = jwt.verify(token, process.env.PRIVATE_SECRET_KEY_JWT);

    req._id = payload._id;
    req.username = payload.username;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: 'El token ingresado no es valido.',
    });
  }
};

module.exports = JWTValidation;
