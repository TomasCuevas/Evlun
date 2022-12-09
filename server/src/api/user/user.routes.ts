/**
 * user-following-routes
 * /api/user
 */

import { Router } from "express";
import { check, query } from "express-validator";

const router = Router();

//* middlewares *//
import {
  JWTValidation,
  differentIdsValidation,
  fieldsValidation,
} from "../../middlewares";

//* controllers *//
import {
  followUser,
  getUser,
  searchUsers,
  unfollowUser,
} from "./user.controllers";

//* routes *//

/** @get_user */
router.get(
  "/username/:username",
  [
    check("username", "El nombre de usuario es requerido.").not().isEmpty(),
    fieldsValidation,
  ],
  getUser
);

/** @search_users */
router.get(
  "/search",
  [
    query("search", "Se debe ingresar algun valor para realizar una busqueda.")
      .not()
      .isEmpty(),
    fieldsValidation,
  ],
  searchUsers
);

/** @follow_user */
router.post(
  "/follow",
  [
    check(
      "userId",
      "El ID del usuario no es valido o no fue ingresado."
    ).isMongoId(),
    JWTValidation,
    differentIdsValidation,
    fieldsValidation,
  ],
  followUser
);

/** @unfollow_user */
router.post(
  "/unfollow",
  [
    check(
      "userId",
      "El ID del usuario no es valido o no fue ingresado."
    ).isMongoId(),
    JWTValidation,
    differentIdsValidation,
    fieldsValidation,
  ],
  unfollowUser
);

export default router;
