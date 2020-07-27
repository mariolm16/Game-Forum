const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now(),
  },
  body: {
    type: String,
    required: true,
  },
  _creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  _post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
