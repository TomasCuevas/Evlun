import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

//* models *//
import { UserModel } from "../../database/models";

//* helpers *//
import { generateJWT } from "../../helpers";
import { Types } from "mongoose";

//* controllers *//

/** @register_user */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body;

    // verificar que el email no haya sido registrado previamente
    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: "El email ingresado ya ha sido registrado.",
      });
    }

    // verificar que el nombre de usuario ingresado, no exista en la base de datos
    const usernameExist = await UserModel.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ingresado ya se encuentra utilizado.",
      });
    }

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);

    // generar usuario
    const newUser = {
      name,
      username,
      email,
      password: encryptedPassword,
      date: new Date().getTime(),
    };

    const user = await new UserModel(newUser);
    await user.save();

    // generar token
    const token = await generateJWT(user._id, user.name);

    // respuesta al frontend
    return res.status(201).json({
      ok: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con un administrador.",
    });
  }
};

/** @login_user */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // verificar que exista usuario con el email ingresado
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Correo y/o contraseña ingresada incorrecto/a.",
      });
    }

    // verificar estado del usuario
    if (user.state === false) {
      return res.status(410).json({
        ok: false,
        msg: "El usuario ha sido previamente desabilidado.",
        status: 410,
      });
    }

    // verificar contraseña
    const passwordVerify = await bcryptjs.compareSync(password, user.password);
    if (!passwordVerify) {
      return res.status(400).json({
        ok: false,
        msg: "Datos incorrectos, no se pudo realizar el login.",
      });
    }

    // generar token
    const token = await generateJWT(user._id, user.username);

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con un administrador.",
    });
  }
};

/** @check_jwt */
export const checkJWT = async (
  req: Request & { _id?: Types.ObjectId; username?: string },
  res: Response
) => {
  try {
    const { _id, username } = req;

    // obtener usuario por id del jwt recibido
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(500).json({
        ok: false,
        message: "No existe usuario con el ID ingresado en el jwt.",
      });
    }

    // verificar estado del usuario
    if (user.state === false) {
      return res.status(405).json({
        ok: false,
        msg: "El usuario ha sido previamente desabilidado.",
      });
    }

    // generar nuevo token
    const token = await generateJWT(_id!, username!);

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con un administrador.",
    });
  }
};

/** @deactivate_user */
export const deactivateUser = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { _id } = req;
    const { password } = req.body;

    // obtener usuario por id del jwt recibido
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(500).json({
        ok: false,
        message: "No existe usuario con el ID ingresado en el jwt.",
      });
    }

    // verificamos que el password ingresado sea el correcto
    const passwordVerify = await bcryptjs.compareSync(password, user.password);
    if (!passwordVerify) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña ingresada no es correcta.",
      });
    }

    // desactivar usuario
    await UserModel.findByIdAndUpdate(_id, { state: false });

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

/** @reactivate_user */
export const reactivateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // obtenemos el usuario a partir del email ingresado
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No existe usuario con el email ingresado.",
      });
    }

    // verificamos que el password ingresado sea el correcto
    const passwordVerify = await bcryptjs.compareSync(password, user.password);
    if (!passwordVerify) {
      return res.status(400).json({
        ok: false,
        msg: "El password ingresado no es valido.",
      });
    }

    // reactivar usuario
    user.state = true;
    user.save();

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
