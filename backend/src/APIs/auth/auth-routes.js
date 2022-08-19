/**
 * auth-routes
 * /api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

/**
 * @middlewares
 */
const { fieldsValidation, JWTValidation } = require('../../middleware');

/**
 * @helpers
 */
const { emailValidation } = require('../../helpers');

/**
 * @controllers
 */
const { authLogin, authRefresh } = require('./auth-controllers');

/**
 * @routes
 */
router.post(
  '/login',
  [
    check('email', 'El email ingresado no es valido.').custom(emailValidation),
    check('password', 'El password debe tener entre 8 y 30 caracteres.').isLength({
      min: 8,
      max: 30,
    }),
    fieldsValidation,
  ],
  authLogin,
);

router.get(
  '/refresh',
  [
    check('x-token', 'El token ingresado no es un JsonWebToken valido.').isJWT(),
    fieldsValidation,
    JWTValidation,
  ],
  authRefresh,
);

module.exports = router;
