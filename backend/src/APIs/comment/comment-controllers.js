const { request, response } = require('express');

/**
 * @models
 */
const Comment = require('../../database/models/Comment');
const Post = require('../../database/models/Post');
const ReportedComment = require('../../database/models/ReportComment');

const createComment = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { id: postId } = req.query;
    const { content } = req.body;

    // crear comentario
    const newComment = await Comment({
      content,
      added_by: _id,
      date: new Date().getTime(),
      postRef: postId,
    });
    await newComment.save();

    // tomar comentario creado
    const comment = await Comment.findById(newComment._id).populate('added_by', {
      _id: true,
      avatar: true,
      name: true,
      username: true,
    });

    // enlazar comentario al post
    const post = await Post.findById(postId);
    const addNewComment = post.comments;
    addNewComment.push(comment._id);

    post.comments = addNewComment;
    post.save();

    // respuesta al frontend
    res.status(201).json({
      ok: true,
      msg: 'created',
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const getComments = async (req = request, res = response) => {
  try {
    const { id, limit = 20, skip = 0, lt } = req.query;

    // obtener comentarios de un posts
    const comments = await Comment.find({ postRef: id, date: { $lt: lt }, state: true })
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
      comments,
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

    // obtener comentario
    const comment = await Comment.findById(id).populate('added_by', {
      _id: true,
      avatar: true,
      name: true,
      username: true,
    });

    // agregar o quitar like
    if (comment.likes.find((userId) => userId.valueOf() === _id)) {
      const newLikes = comment.likes.filter((userId) => userId.valueOf() !== _id);
      comment.likes = newLikes;
    } else {
      comment.likes.push(_id);
    }

    await comment.save();

    // respuesta al frontend
    res.status(201).json({
      ok: true,
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const reportComment = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { id } = req.query;

    const newReport = await new ReportedComment({ commentId: id, reportedBy: _id });
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

const deleteComment = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { id } = req.query;

    // buscar comentario a eliminar
    const comment = await Comment.findById(id).populate('added_by', { _id: true });
    if (!comment) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe post con el ID ingresado.',
      });
    }

    // verificar que el usuario que quiere eliminar el comentario lo haya creado
    if (comment.added_by._id.valueOf() !== _id.valueOf()) {
      return res.status(403).json({
        ok: false,
        msg: 'No tienes permiso para realizar esta operacion.',
      });
    }

    // quitar comentario del post
    const post = await Post.findById(comment.postRef);
    const newComments = post.comments.filter(
      (commentId) => commentId.valueOf() !== comment._id.valueOf(),
    );
    post.comments = newComments;
    post.save();

    // desactivar comentario y guardarlo
    comment.state = false;
    await comment.save();

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
  createComment,
  deleteComment,
  getComments,
  reportComment,
};
