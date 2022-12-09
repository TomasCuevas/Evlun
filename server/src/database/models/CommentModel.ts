import { Schema, model, trusted } from "mongoose";

const CommentSchema = new Schema({
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
  likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

CommentSchema.method("toJSON", function () {
  const { __v, ...comment } = this.toObject();

  return comment;
});

export const CommentModel = model("comments", CommentSchema);
