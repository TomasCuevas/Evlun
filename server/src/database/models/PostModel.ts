import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  added_by: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  postRef: {
    type: Schema.Types.ObjectId,
    ref: "posts",
  },
  state: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Number,
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "posts" }],
});

PostSchema.method("toJSON", function () {
  const { __v, ...post } = this.toObject();
  return post;
});

export const PostModel = model("posts", PostSchema);
