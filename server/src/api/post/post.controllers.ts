import { Request, Response } from "express";
import { Types } from "mongoose";

//* models *//
import { PostModel, ReportPostModel, UserModel } from "../../database/models";

//* controllers *//

//! create post
export const createPost = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { _id } = req;
    const { content, postRef } = req.body;

    // crear post
    const newPost = await new PostModel({
      added_by: _id,
      content,
      date: new Date().getTime(),
      postRef,
    });

    // verificar si es una respuesta y añadirlo al post de referencia si lo es
    if (postRef) {
      const post = await PostModel.findById(postRef);
      if (post) {
        post.answers.push(newPost._id);
        await post.save();
      }
    }

    // guardar post
    await newPost.save();

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

//! get unique post
export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // obtener post
    const post = await PostModel.findById(id).populate("added_by", {
      _id: true,
      avatar: true,
      name: true,
      username: true,
    });
    if (!post) {
      return res.status(400).json({
        ok: false,
        msg: "No se encontro post con el ID ingresado.",
      });
    }

    // verificar si el post es una respuesta a otro post y obtener el post de referencia
    let postRef;
    if (post.postRef) {
      postRef = await PostModel.findById(post.postRef).populate("added_by", {
        _id: true,
        avatar: true,
        name: true,
        username: true,
      });
    }

    return res.status(200).json({
      ok: true,
      post,
      postRef,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

//! get user posts
export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { page = 0 } = req.query;
    const { id } = req.params;

    // obtener posts del usuario
    const posts = await PostModel.find({
      added_by: id,
      state: true,
    })
      .populate("added_by", {
        _id: true,
        avatar: true,
        name: true,
        username: true,
      })
      .skip(Number(page) * 20)
      .limit(20)
      .sort({ date: -1 });

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

//! get answers of post
export const getPostAnswers = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const { postId } = req.params;

    // obtener posts
    const posts = await PostModel.find({ postRef: postId, state: true })
      .populate("added_by", {
        _id: true,
        avatar: true,
        name: true,
        username: true,
      })
      .skip(Number(page) * 20)
      .limit(20)
      .sort({ date: -1 });

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

//! get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { page = 0 } = req.query;

    // obtener los posts
    const posts = await PostModel.find({ state: true, postRef: undefined })
      .populate("added_by", {
        _id: true,
        avatar: true,
        name: true,
        username: true,
      })
      .skip(Number(page) * 20)
      .limit(20)
      .sort({ date: -1 });

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};

//! get followings posts
export const getPostsByFollowings = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const userId = req._id;
    const { page = 0 } = req.query;

    // obtener usuario
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No existe usuario con el ID ingresado.",
      });
    }

    // obtenemos usuarios que sigue el usuario
    const usersFollowingsIds = user.followings.map((user) => user.toString());

    // obtener posts de los usuarios a los que sigue
    const posts = await PostModel.find({
      added_by: { $in: usersFollowingsIds },
      state: true,
    })
      .populate("added_by", {
        _id: true,
        avatar: true,
        name: true,
        username: true,
      })
      .skip(Number(page) * 20)
      .limit(20)
      .sort({ date: -1 });

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con un administrador.",
    });
  }
};

//! get saved posts
export const getSavedPosts = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { _id } = req;
    const { page = 0 } = req.query;

    // obtenemos usuarios
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No existe usuario con el ID ingresado.",
      });
    }

    // obtenemos post guardados
    const posts = await PostModel.find({
      _id: { $in: user.savedPosts },
      state: true,
    })
      .populate("added_by", {
        _id: true,
        avatar: true,
        name: true,
        username: true,
      })
      .skip(Number(page) * 20)
      .limit(20)
      .sort({ date: -1 });

    // respuesta el frontend
    return res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con un administrador.",
    });
  }
};

//! get saved posts list
export const getSavedPostsList = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { _id } = req;

    // obtenemos los posts guardados por el usuario
    const user = await UserModel.findById(_id).select("savedPosts -_id");
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No existe usuario con el ID ingresado.",
      });
    }

    // respuesta al frontend
    return res.status(200).json({
      ok: true,
      savedPostsList: user.savedPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con un administrador.",
    });
  }
};

//! like or unlike post
export const addOrRemoveLike = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { id } = req.query;
    const { _id } = req;

    // obtener post
    const post = await PostModel.findById(id).populate("added_by", {
      _id: true,
      avatar: true,
      name: true,
      username: true,
    });
    if (!post) {
      return res.status(400).json({
        ok: false,
        msg: "No existe post con el ID ingresado.",
      });
    }

    // agregar o quitar like
    if (post.likes?.includes(_id!)) {
      const newLikes = post.likes.filter((userId) => userId.valueOf() !== _id);
      post.likes = newLikes;
    } else {
      post.likes.push(_id!);
    }

    await post.save();

    // respuesta al frontend
    return res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con un administrador.",
    });
  }
};

//! save post
export const addOrRemoveSaved = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { _id } = req;
    const { postId } = req.body;

    // obtener usuario
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No existe usuario con el ID ingresado.",
      });
    }

    // guardar o quitar post de lista de guardados
    if (user.savedPosts.includes(postId)) {
      const newSaved = user.savedPosts.filter(
        (postIdDatabase) => postIdDatabase.valueOf() !== postId
      );
      user.savedPosts = newSaved;
    } else {
      user.savedPosts.push(postId);
    }

    await user.save();

    // respuesta el frontend
    return res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con un administrador.",
    });
  }
};

//! report post
export const reportPost = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { _id } = req;
    const { id } = req.query;

    // reportar post
    const newReport = await new ReportPostModel({
      postId: id,
      reportedBy: _id,
    });
    await newReport.save();

    // respuesta al frontend
    return res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con un administrador.",
    });
  }
};

//! delete post
export const deletePost = async (
  req: Request & { _id?: Types.ObjectId },
  res: Response
) => {
  try {
    const { _id } = req;
    const { postId } = req.body;

    // buscar post a eliminar
    const post = await PostModel.findById(postId).populate("added_by", {
      _id: true,
    });
    if (!post) {
      return res.status(400).json({
        ok: false,
        msg: "No existe post con el ID ingresado.",
      });
    }

    // verificar que el usuario que quiere eliminar el post lo haya creado
    if (post.added_by._id.valueOf() !== _id!.valueOf()) {
      return res.status(403).json({
        ok: false,
        msg: "No tienes permiso para realizar esta operacion.",
      });
    }

    // desactivar post y guardarlo
    post.state = false;
    await post.save();

    // respuesta al frontend
    return res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contacte con un administrador.",
    });
  }
};
