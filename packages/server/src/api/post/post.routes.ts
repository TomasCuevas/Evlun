//* api url: /api/post
//* api url: /api/post

import { Router } from "express";
import { check, query, param } from "express-validator";

const router = Router();

//* middlewares *//
import { fieldsValidation, JWTValidation } from "../../middlewares";

//* controllers *//
import {
  addOrRemoveLike,
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
  saveOrRemoveSavedPost,
} from "./post.controllers";

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
router.get("/saved/list", JWTValidation, getSavedPostsList);

//! like or unlike post
router.put(
  "/like/:postId",
  [
    check("postId", "El ID del post es necesario").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  addOrRemoveLike
);

//! save a post
router.put(
  "/save/:postId",
  [
    check("postId", "El ID del post es necesario.").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  saveOrRemoveSavedPost
);

//! report post
router.put(
  "/report/:postId",
  [
    query("postId", "El ID del post es necesario.").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  reportPost
);

//! delete post
router.put(
  "/delete/:postId",
  [
    check("postId", "El ID del post es necesario.").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  deletePost
);

export default router;
