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

//! get user
router.get(
  "/username/:username",
  [
    check("username", "El nombre de usuario es requerido.").not().isEmpty(),
    fieldsValidation,
  ],
  getUser
);

//! search users
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

//! follow user
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

//! unfollow user
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
