const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

/**
 * @models
 */
const User = require('../../database/models/User');

/**
 * @helpers
 */
const { generateJWT } = require('../../helpers');

const authLogin = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    // verificar que exista usuario con el email ingresado
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Correo y/o contraseña ingresada incorrecto/a.',
      });
    }

    // verificar estado del usuario
    if (user.state === false) {
      return res.status(410).json({
        ok: false,
        msg: 'El usuario ha sido previamente desabilidado.',
      });
    }

    // verificar contraseña
    const passwordVerify = bcryptjs.compareSync(password, user.password);
    if (!passwordVerify) {
      return res.status(400).json({
        ok: false,
        msg: 'Datos incorrectos, no se pudo realizar el login',
      });
    }

    // generar token
    const token = await generateJWT(user._id, user.username);

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      msg: 'login',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const authRefresh = async (req = request, res = response) => {
  try {
    const { _id, username } = req;

    // generar nuevo token
    const token = await generateJWT(_id, username);

    // obtener usuario por id
    const user = await User.findById(_id);

    // verificar estado del usuario
    if (user.state === false) {
      return res.status(405).json({
        ok: false,
        msg: 'El usuario ha sido previamente desabilidado.',
      });
    }

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      msg: 'refresh',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

module.exports = {
  authLogin,
  authRefresh,
};
