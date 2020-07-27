const Post = require("../models").Post;
const User = require("../models").User;

const createPost = (req, res) => {
  console.log(req.user);
  User.findById(req.user._id, (err, foundUser) => {
    if (err) {
      console.log("Error at find user");
      return res.status(500).json(err);
    }
    Post.create(req.body, (err, createdPost) => {
      if (err) {
        console.log("Error at create post");
        return res.status(500).json(err);
      }
      console.log(foundUser.username);

      foundUser._posts.push(createdPost);

      foundUser.save((err, savedUser) => {
        if (err) {
          console.log("Error at save user");
          return res.status(500).json(err);
        }
        res.status(200).json(createdPost);
      });
    });
  });
};

const showPost = (req, res) => {
  Post.findById(req.params.id)
    .populate("_comments")
    .exec((err, foundPost) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(foundPost);
      res.status(200).json(foundPost);
    });
};

const allPosts = (req, res) => {
  Post.find({})
    .populate("_creator", "username")
    .populate("_comments", "body")
    .exec((err, foundPosts) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(foundPosts);
      res.status(200).json(foundPosts);
    });
};

//Skip for now
// const deletePost = (req, res) => {
//   Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     console.log(deletedPost);
//     res.status(200).json(deletedPost);
//   });
// };

const editPost = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPost) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(updatedPost);
      res.status(200).json(updatedPost);
    }
  );
};

const addComment = (req, res) => {};

module.exports = {
  createPost,
  showPost,
  allPosts,
  editPost,
};
