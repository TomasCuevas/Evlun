const { Schema, model } = require('mongoose');

const ReportedCommentSchema = new Schema({
  commentId: {
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

ReportedCommentSchema.method('toJSON', function () {
  const { __v, ...reportedComment } = this.toObject();
  return reportedComment;
});

const ReportedComment = model('reported-comments', ReportedCommentSchema);

module.exports = ReportedComment;
