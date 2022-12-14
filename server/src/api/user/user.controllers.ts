import { Request, Response } from "express";
import { Types } from "mongoose";

//* models *//
import { UserModel } from "../../database/models";

//* controllers *//

/** @get_user */
export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    // buscar usuario por el username y verificar que exista
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro usuario con el username ingresado.",
      });
    }

    // verificar que el usuario no haya sido desactivado
    if (user.state === false) {
      return res.status(410).json({
        ok: false,
        msg: "El usuario ha sido eliminado.",
      });
    }

    // respues al frontend
    return res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

/** @search_users */
export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { search, skip = 0 } = req.query;

    // buscar usuarios
    const users = await UserModel.find({
      username: { $regex: search, $options: "i" },
      state: true,
    })
      .skip(Number(skip) * 20)
      .limit(20);

    return res.status(200).json({
      ok: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

/** @follow_user */
export const followUser = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const userToFollowId = req.body.userId as Types.ObjectId;
    const userId = req._id;

    // buscar usuario por el id en la base de datos
    const userToFollow = await UserModel.findById(userToFollowId);
    if (!userToFollow) {
      return res.status(400).json({
        ok: false,
        msg: "No existe usuario con el ID ingresado.",
      });
    }

    // validar que no se siga al usuario previamente
    const alreadyFollow = userToFollow.followers.find((id) => {
      if (id.valueOf() === userId) return true;
    });
    if (alreadyFollow) {
      return res.status(400).json({
        ok: false,
        msg: "Ya sigues al usuario indicado.",
      });
    }

    // agregar ID del usuario que comienza a seguir en followers del usuario seguido
    userToFollow.followers.push(userId!);
    userToFollow.save();

    // agregar ID del usuario a seguir en followings del usuario que sigue
    const followingUser = await UserModel.findById(userId);
    if (followingUser) {
      followingUser.followings.push(userToFollowId);
      followingUser.save();
    }

    // respuesta al frontend
    return res.status(201).json({
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

/** @unfollow_user */
export const unfollowUser = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const unfollowUserId = req.body.userId as Types.ObjectId;
    const userId = req._id;

    // buscar usuario por ID en la base de datos
    const unfollowUser = await UserModel.findById(unfollowUserId);
    if (!unfollowUser) {
      return res.status(400).json({
        ok: false,
        msg: "No existe usuario con el ID ingresado.",
      });
    }

    // validar que siga al usuario previamente
    const alreadyFollow = unfollowUser.followers.find((id) => {
      if (id === userId) return true;
    });
    if (!alreadyFollow) {
      return res.status(400).json({
        ok: false,
        msg: "No sigues al usuario indicado.",
      });
    }

    // quitar ID a la coleccion followers del usuario al que se deja de seguir
    const newFollowers = unfollowUser.followers.filter((id) => id !== userId);
    unfollowUser.followers = newFollowers;
    unfollowUser.save();

    // quitar ID a la coleccion followings del usuario que deja de seguir
    const followingUser = await UserModel.findById(userId);
    if (followingUser) {
      const newFollowings = followingUser.followings.filter(
        (id) => id !== unfollowUserId
      );

      followingUser.followings = newFollowings;
      followingUser.save();
    }

    // respuesta al frontend
    return res.status(201).json({
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
