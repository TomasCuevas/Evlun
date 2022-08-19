const jwt = require('jsonwebtoken');

const generateJWT = (_id, username) => {
  return new Promise((resolve, reject) => {
    const payload = { _id, username };

    jwt.sign(
      payload,
      process.env.PRIVATE_SECRET_KEY_JWT,
      {
        expiresIn: '2h',
      },
      (error, token) => {
        if (error) {
          reject(new Error('Error al generar el token.'));
        }

        resolve(token);
      },
    );
  });
};

module.exports = generateJWT;
