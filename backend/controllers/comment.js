const Post = require("../models").Post;
const User = require("../models").User;
const Comment = require("../models").Comment;

const createComment = (req, res) => {
  console.log(req.user);
  Post.findById(req.params.post, (err, foundPost) => {
    if (err) {
      console.log("something is happening...");
      return res.status(500).json(err);
    }
    //IF GETTING USER ID FROM JWT - HAVE TO PUT IN BEFORE CREATE
    req.body.author = req.user.id;
    Comment.create(req.body, (err, createdComment) => {
      if (err) {
        console.log("something is happening...");
        return res.status(500).json(err);
      }

      foundPost._comments.push(createdComment);

      foundPost.save((err, savedPost) => {
        if (err) {
          console.log("something is happening...");
          return res.status(500).json(err);
        }
        res.status(200).json(savedPost);
      });
    });
  });
};

const allComments = (req, res) => {
  Comment.find({})
    .populate("author", "username")
    .exec((err, foundComments) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(foundComments);
    });
};

const deleteComment = (req, res) => {
  console.log(req.user);

  Comment.findById(req.params.id).then((foundComment) => {
    const userid = req.user.id;
    const author = foundComment.author.toString();

    console.log(author === userid);

    if (userid === author);
    {
      Comment.findByIdAndRemove(req.params.id, (err, deletedComment) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.status(200).json(deletedComment);
      });
    }
  });
};

module.exports = {
  createComment,
  allComments,
  deleteComment,
};
