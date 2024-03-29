//* api url: /api/settings
//* api url: /api/settings

import { Router } from "express";
import { check } from "express-validator";

const router = Router();

//* middlewares *//
import { fieldsValidation, JWTValidation } from "../../middlewares";

//* helpers *//
import {
  usernameValidation,
  phoneValidation,
  emailValidation,
  passwordValidation,
} from "../../helpers";

//* controllers *//
import {
  updateCountry,
  updateEmail,
  updateGender,
  updatePassword,
  updatePhone,
  updateProfile,
  updateUsername,
} from "./setting.controllers";

//! update profile data
router.put("/profile", [JWTValidation], updateProfile);

//! update username
router.put(
  "/username",
  [
    check(
      "username",
      "El nombre de usuario debe tener entre 4 y 20 caracteres. (Solo puede tener letras, numeros y guiones)"
    ).custom(usernameValidation),
    fieldsValidation,
    JWTValidation,
  ],
  updateUsername
);

//! update phone number
router.put(
  "/phone",
  [
    check("phone", "El numero de telefono ingresado no es valido.").custom(
      phoneValidation
    ),
    fieldsValidation,
    JWTValidation,
  ],
  updatePhone
);

//! update email
router.put(
  "/email",
  [
    check("email", "El email ingresado no es valido.").custom(emailValidation),
    fieldsValidation,
    JWTValidation,
  ],
  updateEmail
);

//! update country
router.put(
  "/country",
  [
    check("country", "Debe enviar un pais").not().isEmpty(),
    fieldsValidation,
    JWTValidation,
  ],
  updateCountry
);

//! update gender
router.put(
  "/gender",
  [
    check("gender", "Debe enviar un genero.").not().isEmpty(),
    fieldsValidation,
    JWTValidation,
  ],
  updateGender
);

//! update password
router.put(
  "/password",
  [
    check(
      "currentPassword",
      "Alguna de las contraseñas ingresada no tiene un formato valido.."
    ).custom(passwordValidation),
    check(
      "newPassword",
      "Alguna de las contraseñas ingresada no tiene un formato valido.."
    ).custom(passwordValidation),
    check(
      "repeatNewPassword",
      "Alguna de las contraseñas ingresada no tiene un formato valido.."
    ).custom(passwordValidation),

    fieldsValidation,
    JWTValidation,
  ],
  updatePassword
);

export default router;
