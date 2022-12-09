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

/** @create_post */
router.post(
  "/create",
  [
    check(
      "content",
      "El contenido del post debe tener entre 1 y 250 caracteres."
    ).isLength({
      min: 1,
      max: 250,
    }),
    JWTValidation,
    fieldsValidation,
  ],
  createPost
);

/** @get_unique_post */
router.get(
  "/id/:id",
  [param("id", "El ID del post es necesario.").isMongoId(), fieldsValidation],
  getPost
);

/** @get_user_posts */
router.get(
  "/user/:id",
  [
    param("id", "El ID del usuario es requerido.").isMongoId(),
    fieldsValidation,
  ],
  getUserPosts
);

/** @get_answers_of_post */
router.get(
  "/answers/:postId",
  [
    param("postId", "El ID del post no es un ID valido.").isMongoId(),
    fieldsValidation,
  ],
  getPostAnswers
);

/** @get_all_posts */
router.get("/all", [JWTValidation], getAllPosts);

/** @get_followings_posts */
router.get("/followings", [JWTValidation], getPostsByFollowings);

/** @get_saved_posts */
router.get("/saved", [JWTValidation], getSavedPosts);

/** @get_saved_posts_list */
router.get("/savedlist", JWTValidation, getSavedPostsList);

/** @like_or_unlike_to_a_post */
router.post(
  "/like",
  [
    query("id", "El ID del post es necesario").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  addOrRemoveLike
);

/** @save_a_post */
router.post(
  "/save",
  [
    check("postId", "El ID del post es necesario.").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  addOrRemoveSaved
);

/** @report_a_post */
router.post(
  "/report",
  [
    query("id", "El ID del post es necesario.").isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  reportPost
);

/** @delete_a_post */
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
