/**
 * auth routes
 * /api/auth
 */

import { Router } from "express";
import { check } from "express-validator";

const router = Router();

//* middlewares *//
import { fieldsValidation, JWTValidation } from "../../middlewares";

//* helpers *//
import {
  emailValidation,
  nameValidation,
  passwordValidation,
  usernameValidation,
} from "../../helpers";

//* controllers *//
import {
  login,
  registerUser,
  checkJWT,
  deactivateUser,
  reactivateUser,
} from "./auth.controllers";

//* routes *//

//! register user
router.post(
  "/create",
  [
    check(
      "name",
      "El nombre debe tener entre 2 y 30 caracteres. (Solo puede contener letras)"
    ).custom(nameValidation),
    check(
      "username",
      "El nombre de usuario debe tener entre 4 y 20 caracteres. (Solo puede tener letras, numeros y guiones)"
    ).custom(usernameValidation),
    check("email", "El email ingresado no es valido.").custom(emailValidation),
    check("password", "El password debe tener entre 8 y 30 caracteres.").custom(
      passwordValidation
    ),
    fieldsValidation,
  ],
  registerUser
);

//! login user
router.post(
  "/login",
  [
    check("email", "El email ingresado no es valido.").custom(emailValidation),
    check(
      "password",
      "El password debe tener entre 8 y 30 caracteres."
    ).isLength({
      min: 8,
      max: 30,
    }),
    fieldsValidation,
  ],
  login
);

//! check jwt
router.get(
  "/check",
  [
    check(
      "evluntoken",
      "El token ingresado no es un JsonWebToken valido."
    ).isJWT(),
    fieldsValidation,
    JWTValidation,
  ],
  checkJWT
);

//! deactivate user
router.put(
  "/deactivate",
  [
    check("password", "El password debe tener entre 8 y 30 caracteres.").custom(
      passwordValidation
    ),
    fieldsValidation,
    JWTValidation,
  ],
  deactivateUser
);

//! reactivate user
router.put(
  "/reactivate",
  [
    check("email", "El email ingresado no es valido.").custom(emailValidation),
    check("password", "El password debe tener entre 8 y 30 caracteres.").custom(
      passwordValidation
    ),
    fieldsValidation,
  ],
  reactivateUser
);

export default router;
