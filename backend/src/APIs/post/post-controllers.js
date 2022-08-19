const { request, response } = require('express');

/**
 * @models
 */
const Post = require('../../database/models/Post');
const ReportedPost = require('../../database/models/ReportedPost');
const User = require('../../database/models/User');

const createPost = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { content } = req.body;

    // crear post
    const newPost = await new Post({ content, added_by: _id, date: new Date().getTime() });
    await newPost.save();

    // tomar post creado
    const post = await Post.findById(newPost._id).populate('added_by', {
      _id: true,
      avatar: true,
      name: true,
      username: true,
    });

    // respuesta al frontend
    res.status(201).json({
      ok: true,
      msg: 'created',
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const getPost = async (req = request, res = response) => {
  try {
    const { id } = req.query;

    // obtener post
    const post = await Post.findById(id).populate('added_by', {
      _id: true,
      avatar: true,
      name: true,
      username: true,
    });
    if (!post) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontro post con el ID ingresado.',
      });
    }

    res.status(200).json({
      ok: true,
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const getUserPosts = async (req = request, res = response) => {
  try {
    const { id, limit = 20, skip = 0, lt } = req.query;

    // obtener posts del usuario
    const posts = await Post.find({ added_by: id, date: { $lt: lt }, state: true })
      .populate('added_by', {
        _id: true,
        avatar: true,
        name: true,
        username: true,
      })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const getAllPosts = async (req = request, res = response) => {
  try {
    const { limit = 20, skip = 0, lt } = req.query;

    // obtener los posts
    const posts = await Post.find({ date: { $lt: lt }, state: true })
      .populate('added_by', {
        _id: true,
        avatar: true,
        name: true,
        username: true,
      })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const getPostsByFollowings = async (req = request, res = response) => {
  try {
    const userId = req._id;
    const { limit = 20, skip = 0, lt } = req.query;

    // obtener usuario
    const user = await User.findById(userId);

    // obtenemos usuarios que sigue el usuario
    const usersFollowingsIds = user.followings.map((user) => user.toString());

    // obtener posts de los usuarios a los que sigue
    const posts = await Post.find({
      added_by: { $in: usersFollowingsIds },
      date: { $lt: lt },
      state: true,
    })
      .populate('added_by', {
        _id: true,
        avatar: true,
        name: true,
        username: true,
      })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const getPostSaved = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { limit = 20, skip = 0 } = req.query;

    // obtenemos usuarios
    const user = await User.findById(_id);

    // obtenemos post guardados
    const posts = await Post.find({ _id: { $in: user.postsSaved }, state: true })
      .populate('added_by', {
        _id: true,
        avatar: true,
        name: true,
        username: true,
      })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    // respuesta el frontend
    res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const getSavedPostsList = async (req = request, res = response) => {
  try {
    const { _id } = req;

    // obtener usuario
    const user = await User.findById(_id);

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      savedPostsList: user.postsSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const addOrRemoveLike = async (req = request, res = response) => {
  try {
    const { id } = req.query;
    const { _id } = req;

    // obtener post
    const post = await Post.findById(id).populate('added_by', {
      _id: true,
      avatar: true,
      name: true,
      username: true,
    });

    // agregar o quitar like
    if (post.likes?.includes(_id)) {
      const newLikes = post.likes.filter((userId) => userId.valueOf() !== _id);
      post.likes = newLikes;
    } else {
      post.likes.push(_id);
    }

    await post.save();

    // respuesta al frontend
    res.status(201).json({
      ok: true,
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const addOrRemoveSaved = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { id } = req.query;

    // obtener usuario
    const user = await User.findById(_id);

    // guardar o quitar post de lista de guardados
    if (user.postsSaved?.includes(id)) {
      const newSaved = user.postsSaved.filter((postId) => postId.valueOf() !== id);
      user.postsSaved = newSaved;
    } else {
      user.postsSaved.push(id);
    }

    await user.save();

    // respuesta el frontend
    res.status(201).json({
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

const reportPost = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { id } = req.query;

    const newReport = await new ReportedPost({ postId: id, reportedBy: _id });
    await newReport.save();

    res.status(201).json({
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

const deletePost = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { id } = req.query;

    // buscar post a eliminar
    const post = await Post.findById(id).populate('added_by', { _id: true });
    if (!post) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe post con el ID ingresado.',
      });
    }

    // verificar que el usuario que quiere eliminar el post lo haya creado
    if (post.added_by._id.valueOf() !== _id.valueOf()) {
      return res.status(403).json({
        ok: false,
        msg: 'No tienes permiso para realizar esta operacion.',
      });
    }

    // desactivar post y guardarlo
    post.state = false;
    await post.save();

    // respuesta al frontend
    res.status(201).json({
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
  addOrRemoveLike,
  addOrRemoveSaved,
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  getPostSaved,
  getPostsByFollowings,
  getSavedPostsList,
  getUserPosts,
  reportPost,
};
