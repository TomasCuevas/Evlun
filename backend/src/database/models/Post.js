const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  added_by: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Number,
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
});

PostSchema.method('toJSON', function () {
  const { __v, ...post } = this.toObject();
  return post;
});

const Post = model('posts', PostSchema);

module.exports = Post;
