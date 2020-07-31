const Post = require("../models").Post;
const User = require("../models").User;

const createPost = (req, res) => {
  User.findById(req.user.id, (err, foundUser) => {
    if (err) {
      return res.status(500).json(err);
    }
    req.body._creator = req.user.id;
    Post.create(req.body, (err, createdPost) => {
      if (err) {
        return res.status(500).json(err);
      }
      foundUser._posts.push(createdPost);
      foundUser.save((err, savedUser) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.status(200).json(createdPost);
      });
    });
  });
};

const showPost = (req, res) => {
  Post.findById(req.params.id)
    .populate("_creator", "username")
    .populate("_comments")
    .exec((err, foundPost) => {
      if (err) {
        return res.status(500).json(err);
      }
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
      res.status(200).json(foundPosts);
    });
};

const deletePost = (req, res) => {
  const userId = req.user.id;
  Post.findById(req.params.id).then((foundPost) => {
    console.log(foundPost);
    const creator = foundPost._creator.toString();

    if (userId === creator) {
      Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.status(200).json(deletedPost);
      });
    } else {
      return res.status(401).json("Unauthorized access");
    }
  });
};

const editPost = (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  Post.findById(req.params.id).then((foundPost) => {
    console.log(foundPost);
    const creator = foundPost._creator.toString();

    console.log(userId, creator);
    if (userId === creator) {
      Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedPost) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.status(200).json(updatedPost);
        }
      );
    } else {
      return res.status(401).json("Unauthorized access");
    }
  });
};

module.exports = {
  createPost,
  showPost,
  allPosts,
  editPost,
  deletePost,
};
