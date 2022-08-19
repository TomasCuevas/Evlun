/**
 * post-routes
 * /api/post
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
  addOrRemoveSaved,
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  getPostSaved,
  getPostsByFollowings,
  getSavedPostsList,
  getUserPosts,
  reportPost,
} = require('./post-controllers');

/**
 * @routes
 */

// create post
router.post(
  '/create',
  [
    check('content', 'El contenido del post debe tener entre 1 y 155 caracteres.').isLength({
      min: 1,
      max: 155,
    }),
    JWTValidation,
    fieldsValidation,
  ],
  createPost,
);

// get post
router.get(
  '/',
  [check('id', 'El ID del post es necesario.').isMongoId(), fieldsValidation],
  getPost,
);

// get profile posts
router.get(
  '/user',
  [check('id', 'El ID del usuario es requerido.').isMongoId(), fieldsValidation],
  getUserPosts,
);

// get all posts
router.get('/all', [JWTValidation], getAllPosts);

// get followings posts
router.get('/followings', [JWTValidation], getPostsByFollowings);

// get saved posts
router.get('/saved', [JWTValidation], getPostSaved);

// get list of saved posts
router.get('/savedlist', JWTValidation, getSavedPostsList);

// like to a post
router.post(
  '/like',
  [query('id', 'El ID del post es necesario').isMongoId(), JWTValidation, fieldsValidation],
  addOrRemoveLike,
);

// save a post
router.post(
  '/save',
  [query('id', 'El ID del post es necesario.').isMongoId(), JWTValidation, fieldsValidation],
  addOrRemoveSaved,
);

// report a post
router.post(
  '/report',
  [query('id', 'El ID del post es necesario.').isMongoId(), JWTValidation, fieldsValidation],
  reportPost,
);

// delete a post
router.delete(
  '/delete',
  [query('id', 'El ID del post es necesario.').isMongoId(), JWTValidation, fieldsValidation],
  deletePost,
);

module.exports = router;
