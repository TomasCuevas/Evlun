/**
 * user-following-routes
 * /api/user
 */
const { Router } = require('express');
const { check, query } = require('express-validator');

const router = Router();

/**
 * @helpers
 */
const {
  emailValidation,
  nameValidation,
  passwordValidation,
  usernameValidation,
} = require('../../helpers');

/**
 * @middlewares
 */
const { fieldsValidation, JWTValidation, differentIdsValidation } = require('../../middleware');

/**
 * @controllers
 */
const {
  createUser,
  deactiveUser,
  followUser,
  getUser,
  reactivateUser,
  searchUsers,
  unfollowUser,
  updateUser,
} = require('./user-controllers');

/**
 * @routes
 */
router.post(
  '/create',
  [
    check(
      'name',
      'El nombre debe tener entre 2 y 25 caracteres. (Solo puede contener letras)',
    ).custom(nameValidation),
    check(
      'username',
      'El nombre de usuario debe tener entre 4 y 15 caracteres. (Solo puede tener letras, numeros y guiones)',
    ).custom(usernameValidation),
    check('email', 'El email ingresado no es valido.').custom(emailValidation),
    check('password', 'El password debe tener entre 8 y 30 caracteres.').custom(passwordValidation),
    fieldsValidation,
  ],
  createUser,
);

router.get(
  '/',
  [query('username', 'El nombre de usuario es requerido.').not().isEmpty(), fieldsValidation],
  getUser,
);

router.get(
  '/search',
  [
    query('search', 'Se debe ingresar algun valor para realizar una busqueda.').not().isEmpty(),
    fieldsValidation,
  ],
  searchUsers,
);

router.put('/update', [JWTValidation], updateUser);

router.delete('/deactive', [JWTValidation], deactiveUser);

router.put('/reactivate', reactivateUser);

router.post(
  '/follow',
  [
    query('id', 'El ID del usuario no es valido o no fue ingresado.').isMongoId(),
    JWTValidation,
    differentIdsValidation,
    fieldsValidation,
  ],
  followUser,
);

router.post(
  '/unfollow',
  [
    query('id', 'El ID del usuario no es valido o no fue ingresado.').isMongoId(),
    JWTValidation,
    differentIdsValidation,
    fieldsValidation,
  ],
  unfollowUser,
);

module.exports = router;
