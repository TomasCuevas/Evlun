import { Request, Response } from "express";
import { Types } from "mongoose";

//* models *//
import { UserModel } from "../../database/models";

//! get user
export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    //? buscar usuario por el username y verificar que exista
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        msg: "No se encontro usuario con el username ingresado.",
      });
    }

    //? verificar que el usuario no haya sido desactivado
    if (user.state === false) {
      return res.status(410).json({
        msg: "El usuario ha sido eliminado.",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

//! search users
export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { search, skip = 0 } = req.query;

    //? buscar usuarios
    const users = await UserModel.find({
      username: { $regex: search, $options: "i" },
      state: true,
    })
      .skip(Number(skip) * 20)
      .limit(20);

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

//! follow user
export const followUser = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { userId } = req.params as { userId?: Types.ObjectId };
    const { _id } = req;

    //? buscar usuario por el id en la base de datos
    const userToFollow = await UserModel.findById(userId);
    if (!userToFollow) {
      return res.status(400).json({
        msg: "No existe usuario con el ID ingresado.",
      });
    }

    //? validar que no se siga al usuario previamente
    const alreadyFollow = userToFollow.followers.find((id) => {
      if (id.valueOf() === userId!.valueOf()) return true;
    });
    if (alreadyFollow) {
      return res.status(400).json({
        msg: "Ya sigues al usuario indicado.",
      });
    }

    //? agregar ID del usuario que comienza a seguir en followers del usuario seguido
    userToFollow.followers.push(_id!);
    userToFollow.save();

    //? agregar ID del usuario a seguir en followings del usuario que sigue
    const followingUser = await UserModel.findById(_id);
    if (followingUser) {
      followingUser.followings.push(userId!);
      followingUser.save();
    }

    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

//! unfollow user
export const unfollowUser = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { userId } = req.params as { userId?: Types.ObjectId };
    const { _id } = req;

    //? buscar usuario por ID en la base de datos
    const unfollowUser = await UserModel.findById(userId);
    if (!unfollowUser) {
      return res.status(400).json({
        msg: "No existe usuario con el ID ingresado.",
      });
    }

    //? validar que siga al usuario previamente
    const alreadyFollow = unfollowUser.followers.find((id) => {
      if (id.valueOf() === _id!.valueOf()) return true;
    });
    if (!alreadyFollow) {
      return res.status(400).json({
        msg: "No sigues al usuario indicado.",
      });
    }

    //? quitar ID a la coleccion followers del usuario al que se deja de seguir
    const newFollowers = unfollowUser.followers.filter(
      (id) => id.valueOf() !== _id!.valueOf()
    );
    unfollowUser.followers = newFollowers;
    unfollowUser.save();

    //? quitar ID a la coleccion followings del usuario que deja de seguir
    const followingUser = await UserModel.findById(_id);
    if (followingUser) {
      const newFollowings = followingUser.followings.filter(
        (id) => id.valueOf() !== userId!.valueOf()
      );

      followingUser.followings = newFollowings;
      followingUser.save();
    }

    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};
