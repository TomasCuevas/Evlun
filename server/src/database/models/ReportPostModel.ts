import { Schema, model } from "mongoose";

const ReportedPostSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  reportedBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

ReportedPostSchema.method("toJSON", function () {
  const { __v, ...reportedPost } = this.toObject();
  return reportedPost;
});

export const ReportPostModel = model("reported-posts", ReportedPostSchema);
