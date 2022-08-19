/**
 * post-routes
 * /api/comment
 */
const { Router } = require('express');
const { check, query } = require('express-validator');

const router = Router();

/**
 * @middleware
 */
const { fieldsValidation, JWTValidation } = require('../../middleware');

/**
 * @controllers
 */
const {
  addOrRemoveLike,
  createComment,
  deleteComment,
  getComments,
  reportComment,
} = require('./comment-controllers');

/**
 * @routes
 */

// create comment
router.post(
  '/create',
  [
    check('content', 'El contenido del post debe tener entre 1 y 155 caracteres.').isLength({
      min: 1,
      max: 155,
    }),
    query('id', 'El ID del post es necesario.').isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  createComment,
);

// get comments
router.get(
  '/',
  [query('id', 'El ID del post es necesario.').isMongoId(), fieldsValidation],
  getComments,
);

// like to a comment
router.post(
  '/like',
  [query('id', 'El ID del comentario es necesario').isMongoId(), JWTValidation, fieldsValidation],
  addOrRemoveLike,
);

// report a post
router.post(
  '/report',
  [query('id', 'El ID del comentario es necesario.').isMongoId(), JWTValidation, fieldsValidation],
  reportComment,
);

// delete a comment
router.delete(
  '/delete',
  [query('id', 'El ID del comentario es necesario.').isMongoId(), JWTValidation, fieldsValidation],
  deleteComment,
);

module.exports = router;
