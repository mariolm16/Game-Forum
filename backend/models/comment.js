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
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
