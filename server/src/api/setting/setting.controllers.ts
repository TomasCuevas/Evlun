import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { UploadedFile } from "express-fileupload";
import { Types } from "mongoose";

//* models *//
import { UserModel } from "../../database/models";

//* helpers *//
import {
  biographyValidation,
  cloudinary,
  emailValidation,
  locationValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  usernameValidation,
} from "../../helpers";

//* services *//
import {
  uploadAvatarToCloudinary,
  uploadBannerToCloudinary,
} from "../../services";

//* controllers *//

/** @update_profile_data */
export const updateProfile = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { _id } = req;
    const { biography, location, name, noBanner } = req.body;
    const avatar = req.files?.avatar as UploadedFile;
    const banner = req.files?.banner as UploadedFile;

    // obtenemos usuario
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No se encontro usuario con el ID ingresado.",
      });
    }

    // objeto con los campos a modificar
    const newValues: {
      avatar?: string;
      avatarId?: string;
      banner?: string;
      bannerId?: string;
      name?: string;
      biography?: string;
      location?: string;
    } = {};

    // verificamos y subimos avatar a cloudinary
    if (avatar) {
      if (avatar.size > 512000) {
        return res.status(400).json({
          ok: false,
          msg: "La imagen de perfil no puede pesar mas de 512kbs.",
        });
      }

      const { newAvatar, newAvatarId } = await uploadAvatarToCloudinary(
        avatar,
        user.avatarId
      );

      if (newAvatar && newAvatarId) {
        newValues.avatar = newAvatar;
        newValues.avatarId = newAvatarId;
      }
    }

    // verificamos y subimos banner a cloudinary
    if (banner) {
      if (banner.size > 1024000) {
        return res.status(400).json({
          ok: false,
          msg: "La imagen de portada no puede pesar mas de 1mb.",
        });
      }

      const { newBanner, newBannerId } = await uploadBannerToCloudinary(
        banner,
        user.bannerId
      );

      if (newBanner && newBannerId) {
        newValues.banner = newBanner;
        newValues.bannerId = newBannerId;
      }
    }

    // verificamos y eliminamos banner actual
    if (noBanner) {
      if (user.bannerId) await cloudinary.uploader.destroy(user.bannerId);

      newValues.banner = "";
      newValues.bannerId = "";
    }

    // verificar nombre
    if (name && !nameValidation(name)) {
      return res.status(400).json({
        msg: "El nombre ingresado no es valido.",
      });
    } else {
      newValues.name = name;
    }

    // verificar biografia
    if (biography && !biographyValidation(biography)) {
      return res.status(400).json({
        msg: "La biografia ingresada no es valida.",
      });
    } else {
      newValues.biography = biography;
    }

    // verificar ubicacion
    if (location && !locationValidation(location)) {
      return res.status(400).json({
        msg: "La ubicacion ingresada no es valida.",
      });
    } else {
      newValues.location = location;
    }

    // actualizar usuario
    await UserModel.findByIdAndUpdate(_id, { ...newValues });

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

/** @update_username */
export const updateUsername = async (
  req: Request & { _id?: string },
  res: Response
) => {
  try {
    const { _id } = req;
    const { username } = req.body;

    // verificar nuevo username
    if (username && !usernameValidation(username)) {
      return res.status(400).json({
        ok: false,
        msg: "El nombre de usuario ingresado no es valido.",
      });
    } else {
      const verifyUsername = await UserModel.findOne({ username });
      if (verifyUsername) {
        return res.status(401).json({
          ok: false,
          msg: "El usuario ingresado ya se encuentra utilizado.",
        });
      }
    }

    // objeto con el campo a modificar
    const newValue = { username };

    // actualizar usuario
    await UserModel.findByIdAndUpdate(_id, { ...newValue });

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

/** @update_phone_number */
export const updatePhone = async (
  req: Request & { _id?: string },
  res: Response
) => {
  try {
    const { _id } = req;
    const { phone } = req.body;

    // verificar numero de telefono
    if (phone && !phoneValidation(phone)) {
      return res.status(400).json({
        ok: false,
        msg: "El numero de telefono ingresado no es valido.",
      });
    }

    // objeto con el campo a modificar
    const newValue = { phone };

    // actualizar usuario
    await UserModel.findByIdAndUpdate(_id, { ...newValue });

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

/** @update_email */
export const updateEmail = async (
  req: Request & { _id?: string },
  res: Response
) => {
  try {
    const { _id } = req;
    const { email } = req.body;

    // verificar nuevo email
    if (email && !emailValidation(email)) {
      return res.status(400).json({
        ok: false,
        msg: "El email ingresado no es valido.",
      });
    } else {
      const verifyEmail = await UserModel.findOne({ email });
      if (verifyEmail) {
        return res.status(401).json({
          ok: false,
          msg: "El email ingresado ya ha sido registrado.",
        });
      }
    }

    // objeto con el campo a modificar
    const newValue = { email };

    // actualizar usuario
    await UserModel.findByIdAndUpdate(_id, { ...newValue });

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

/** @update_country */
export const updateCountry = async (
  req: Request & { _id?: string },
  res: Response
) => {
  try {
    const { _id } = req;
    const { country } = req.body;

    // objeto con el campo a modificar
    const newValue = { country };

    // actualizar usuario
    await UserModel.findByIdAndUpdate(_id, { ...newValue });

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

/** @update_gender */
export const updateGender = async (
  req: Request & { _id?: string },
  res: Response
) => {
  try {
    const { _id } = req;
    const { gender } = req.body;

    // verificar que el genero ingresado, sea valido
    if (gender !== "Masculino" && gender !== "Femenino" && gender !== "Otro") {
      return res.status(400).json({
        ok: false,
        msg: "No se ingreso genero valido.",
      });
    }

    // objeto con el campo a modificar
    const newValue = { gender };

    // actualizar usuario
    await UserModel.findByIdAndUpdate(_id, { ...newValue });

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

/** @update_password */
export const updatePassword = async (
  req: Request & { _id?: string },
  res: Response
) => {
  try {
    const { _id } = req;
    const { currentPassword, newPassword } = req.body;

    // obtenemos usuario a modificar
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No se encontro usuario con el ID ingresado.",
      });
    }

    // vericar si el password actual ingresado, es correcto
    const currentPasswordValidation = await bcryptjs.compareSync(
      currentPassword,
      user.password
    );

    if (!currentPasswordValidation) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña actual ingresada, es incorrecta.",
      });
    }

    // verificar que el nuevo password tenga un formato valido
    if (newPassword && !passwordValidation(newPassword)) {
      return res.status(400).json({
        ok: false,
        msg: "Nueva contraseña no tiene un formato valido.",
      });
    }

    // verificar que nuevo password sea diferente al password actual
    if (currentPassword === newPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El nuevo password, no puede ser igual al anterior.",
      });
    }

    // encriptar el nuevo password
    const salt = bcryptjs.genSaltSync();
    const password = bcryptjs.hashSync(newPassword, salt);

    // objeto con el campo a modificar
    const newValue = { password };

    // actualizar usuario
    await UserModel.findByIdAndUpdate(_id, { ...newValue });

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};
