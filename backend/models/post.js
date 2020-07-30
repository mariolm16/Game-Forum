const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
    default:
      "https://i.pinimg.com/originals/f7/81/5d/f7815d95f5693498bd3938773605446f.png",
  },
  body: {
    type: String,
    required: true,
  },
  _creator: {
    require: true,
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  _comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
});

postSchema.pre('remove', function (next) {
  var post = this;
  post.model('_creator').update(
    { posts: { $in: post._creators } },
    { $pull: { post: post._id } },
    { multi: true },
  );
})
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
