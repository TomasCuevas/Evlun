/**
 * post-routes
 * /api/post
 */

import { Router } from "express";
import { check, query, param } from "express-validator";

const router = Router();

//* middlewares *//
import { fieldsValidation, JWTValidation } from "../../middlewares";

//* controllers *//
import {
  addOrRemoveLike,
  addOrRemoveSaved,
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  getPostAnswers,
  getPostsByFollowings,
  getSavedPosts,
  getSavedPostsList,
  getUserPosts,
  reportPost,
} from "./post.controllers";

//* routes *//

//! create post
router.post(
  "/create",
  [
    check("text", "El texto debe tener entre 1 y 250 caracteres.").isLength({
      min: 1,
      max: 250,
    }),
    JWTValidation,
    fieldsValidation,
  ],
  createPost
);

//! get unique post
router.get(
  "/id/:id",
  [param("id", "El ID del post es necesario.").isMongoId(), fieldsValidation],
  getPost
);

//! get user posts
router.get(
  "/user/:id",
  [
    param("id", "El ID del usuario es requerido.").isMongoId(),
    fieldsValidation,
  ],
  getUserPosts
);

//! get answers of post
router.get(
  "/answers/:postId",
  [
    param("postId", "El ID del post no es un ID valido.").isMongoId(),
    fieldsValidation,
  ],
  getPostAnswers
);

//! get all posts
router.get("/all", [JWTValidation], getAllPosts);

//! get followings posts
router.get("/followings", [JWTValidation], getPostsByFollowings);

//! get saved posts
router.get("/saved", [JWTValidation], getSavedPosts);

//! get saved posts list
router.get("/savedlist", JWTValidation, getSavedPostsList);

//! like or unlike post
router.post(
  "/like",
  [
    query("id", "El ID del post es necesario").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  addOrRemoveLike
);

//! save a post
router.post(
  "/save",
  [
    check("postId", "El ID del post es necesario.").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  addOrRemoveSaved
);

//! report post
router.post(
  "/report",
  [
    query("id", "El ID del post es necesario.").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  reportPost
);

//! delete post
router.put(
  "/delete",
  [
    check("postId", "El ID del post es necesario.").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  deletePost
);

export default router;
