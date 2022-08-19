const { Schema, model } = require('mongoose');

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

ReportedPostSchema.method('toJSON', function () {
  const { __v, ...reportedPost } = this.toObject();
  return reportedPost;
});

const ReportedPost = model('reported-posts', ReportedPostSchema);

module.exports = ReportedPost;
