/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

/**
 * @models
 */
const User = require('../../database/models/User');

/**
 * @helpers
 */
const {
  biographyValidation,
  cloudinary,
  emailValidation,
  generateJWT,
  locationValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  usernameValidation,
} = require('../../helpers');

const createUser = async (req = request, res = response) => {
  try {
    const { name, username, email, password } = req.body;

    // verificar que el email no haya sido registrado previamente
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: 'El email ingresado ya ha sido registrado.',
      });
    }

    // verificar que el usuario no exista
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ingresado ya se encuentra utilizado.',
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
    const user = await new User(newUser);
    await user.save();

    // generar token
    const token = await generateJWT(user._id, user.name);

    // respuesta al frontend
    res.status(201).json({
      ok: true,
      msg: 'signup',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const getUser = async (req = request, res = response) => {
  try {
    const { username } = req.query;

    // buscar usuario por el username
    const user = await User.findOne({ username });
    if (user.state === false) {
      return res.status(410).json({
        ok: false,
        msg: 'El usuario ha sido eliminado.',
      });
    }

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontro usuario con el username ingresado.',
      });
    }

    // respues al frontend
    res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const searchUsers = async (req = request, res = response) => {
  try {
    const { search, limit = 20, skip = 0 } = req.query;

    const users = await User.find({
      username: { $regex: search, $options: 'i' },
      state: true,
    })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      ok: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const followUser = async (req = request, res = response) => {
  try {
    const userToFollowId = req.query.id;
    const userId = req._id;

    // buscar usuario por el id en la base de datos
    const userToFollow = await User.findById(userToFollowId);
    if (!userToFollow) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe usuario con el ID ingresado.',
      });
    }

    // validar que no se siga al usuario previamente
    const alreadyFollow = userToFollow.followers.find((id) => {
      if (id.toString() === userId) return true;
    });
    if (alreadyFollow) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya sigues al usuario indicado.',
      });
    }

    // agregar ID a la coleccion followers del usuario que sigue
    userToFollow.followers.push(userId);
    userToFollow.save();

    // agregar ID a la coleccion followings del usuario a seguir
    const followingUser = await User.findById(userId);
    followingUser.followings.push(userToFollowId);
    followingUser.save();

    // respuesta al frontend
    res.status(201).json({
      ok: true,
      msg: 'Follow.',
      updateProfileUser: userToFollow.followers,
      updateAuthUser: followingUser.followings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const unfollowUser = async (req = request, res = response) => {
  try {
    const userId = req._id;
    const unfollowUserId = req.query.id;

    // buscar usuario por ID en la base de datos
    const unfollowUser = await User.findById(unfollowUserId);
    if (!unfollowUser) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe usuario con el ID ingresado.',
      });
    }

    // validar que siga al usuario previamente
    const alreadyFollow = unfollowUser.followers.find((id) => {
      if (id.toString() === userId) return true;
    });
    if (!alreadyFollow) {
      return res.status(400).json({
        ok: false,
        msg: 'No sigues al usuario indicado.',
      });
    }

    // quitar ID a la coleccion followers del usuario que deja de seguir
    const newFollowers = unfollowUser.followers.filter(
      (id) => id.toString() !== userId,
    );
    unfollowUser.followers = newFollowers;
    unfollowUser.save();

    // quitar ID a la coleccion followings del usuario al que dejan de seguir
    const followingUser = await User.findById(userId);
    const newFollowings = followingUser.followings.filter(
      (id) => id.toString() !== unfollowUserId,
    );
    followingUser.followings = newFollowings;
    followingUser.save();

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      msg: 'Unfollow.',
      updateProfileUser: unfollowUser.followers,
      updateAuthUser: followingUser.followings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    const { _id } = req;
    let {
      avatar,
      banner,
      biography,
      country,
      email,
      gender,
      location,
      name,
      newPassword,
      oldPassword,
      phone,
      username,
    } = req.body;

    if (banner === 'false') banner = false;
    if (avatar === 'false') avatar = false;

    // obtenemos usuario
    const user = await User.findById(_id);

    const avatarPetition = req.files?.avatar;
    const bannerPetition = req.files?.banner;

    if (avatarPetition && avatarPetition.size > 512000) {
      return res.status(400).json({
        ok: false,
        msg: 'La imagen de perfil no puede pesar mas de 512kbs.',
      });
    }

    if (bannerPetition && bannerPetition.size > 1024000) {
      return res.status(400).json({
        ok: false,
        msg: 'La imagen de portada no puede pesar mas de 1mb.',
      });
    }

    let newAvatar;
    let newAvatarId;
    let newBanner;
    let newBannerId;

    if (avatarPetition) {
      if (user.avatarId) await cloudinary.uploader.destroy(user.avatarId);
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        avatarPetition.tempFilePath,
        {
          folder: 'Avatars',
        },
      );

      newAvatar = await secure_url;
      newAvatarId = await public_id;
    }

    if (bannerPetition) {
      if (user.bannerId) await cloudinary.uploader.destroy(user.bannerId);
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        bannerPetition.tempFilePath,
        {
          folder: 'Banners',
        },
      );

      newBanner = await secure_url;
      newBannerId = await public_id;
    }

    if (banner === false) {
      if (user.bannerId) await cloudinary.uploader.destroy(user.bannerId);

      newBanner = false;
      newBannerId = false;
    }

    let password;

    if (newPassword && !passwordValidation(newPassword)) {
      return res.status(400).json({
        ok: false,
        msg: 'Nueva contraseña incorrecta.',
      });
    } else if (newPassword && oldPassword) {
      const oldPasswordValidation = bcryptjs.compareSync(
        oldPassword,
        user.password,
      );
      if (!oldPasswordValidation)
        return res.status(400).json({
          ok: false,
          msg: 'Contraseña actual incorrecta.',
        });

      const salt = bcryptjs.genSaltSync();
      password = bcryptjs.hashSync(newPassword, salt);
    }

    if (biography && !biographyValidation(biography)) {
      return res.status(400).json({
        ok: false,
        msg: 'La biografia ingresada no es valida.',
      });
    }

    if (location && !locationValidation(location)) {
      return res.status(400).json({
        ok: false,
        msg: 'La ubicacion ingresada no es valida.',
      });
    }

    if (username && !usernameValidation(username)) {
      return res.status(400).json({
        ok: false,
        msg: 'El nombre de usuario ingresado no es valido.',
      });
    } else {
      const verifyUsername = await User.findOne({ username });
      if (verifyUsername) {
        return res.status(401).json({
          ok: false,
          msg: 'El usuario ingresado ya se encuentra utilizado.',
        });
      }
    }

    if (name && !nameValidation(name)) {
      return res.status(400).json({
        ok: false,
        msg: 'El nombre ingresado no es valido.',
      });
    }

    if (phone && !phoneValidation(phone)) {
      return res.status(400).json({
        ok: false,
        msg: 'El numero de telefono ingresado no es valido.',
      });
    }

    if (email && !emailValidation(email)) {
      return res.status(400).json({
        ok: false,
        msg: 'El email ingresado no es valido.',
      });
    } else {
      const verifyEmail = await User.findOne({ email });
      if (verifyEmail) {
        return res.status(401).json({
          ok: false,
          msg: 'El email ingresado ya ha sido registrado.',
        });
      }
    }

    if (gender && gender !== 'Masculino' && gender !== 'Femenino') {
      return res.status(400).json({
        ok: false,
        msg: 'No se ingreso genero valido.',
      });
    }

    const values = {
      avatar: newAvatar,
      avatarId: newAvatarId,
      banner: newBanner,
      bannerId: newBannerId,
      biography,
      country,
      email,
      gender,
      location,
      name,
      password,
      phone,
      username,
    };

    // actualizamos usuario
    await User.findByIdAndUpdate(_id, { ...values });

    res.status(200).json({
      ok: true,
      msg: 'Updated user',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const deactiveUser = async (req = request, res = response) => {
  try {
    const { _id } = req;

    // desactivar usuario
    await User.findByIdAndUpdate(_id, { state: false });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const reactivateUser = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    // verificar password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe usuario con el email ingresado.',
      });
    }

    const passwordVerify = bcryptjs.compareSync(password, user.password);
    if (!passwordVerify) {
      return res.status(400).json({
        ok: false,
        msg: 'El password ingresado no es valido.',
      });
    }

    // reactivar usuario
    user.state = true;
    user.save();

    // respuesta al frontend
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

module.exports = {
  createUser,
  deactiveUser,
  followUser,
  getUser,
  reactivateUser,
  searchUsers,
  unfollowUser,
  updateUser,
};
