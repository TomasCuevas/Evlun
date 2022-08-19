const { request, response } = require('express');

const differentIdsValidation = async (req = request, res = response, next) => {
  try {
    const userToFollowId = req.query.id;
    const userId = req._id;

    // validar que los id no sean iguales
    if (userToFollowId === userId) {
      return res.status(400).json({
        ok: false,
        msg: 'Debes enviar un ID diferente al tuyo.',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

module.exports = differentIdsValidation;
