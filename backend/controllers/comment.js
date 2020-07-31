const { json } = require("body-parser");

const Post = require("../models").Post;
const User = require("../models").User;
const Comment = require("../models").Comment;

const createComment = (req, res) => {

  Post.findById(req.params.post, (err, foundPost) => {
    if (err) {

      return res.status(500).json(err);
    }
    //IF GETTING USER ID FROM JWT - HAVE TO PUT IN BEFORE CREATE
    req.body.author = req.user.id;
    // console.log('Check4:', req.body.author, 'check3 body', req.body)
    Comment.create(req.body, (err, createdComment) => {
      if (err) {
        console.log("fail at create comment");
        return res.status(500).json(err);
      }

      foundPost._comments.push(createdComment);

      foundPost.save((err, savedPost) => {
        if (err) {

          return res.status(500).json(err);
        }
        res.status(200).json(createdComment);
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

    if (userid === author) {
      Comment.findByIdAndRemove(req.params.id, (err, deletedComment) => {
        if (err) {
          return res.status(500).json(err);
        } else res.status(200).json(deletedComment);
      });
    } else {
      return res.status(401).json("Unauthorized access");
    }
  });
};

const editComment = (req, res) => {
  const userId = req.user.id;
  Comment.findById(req.params.id).then((foundComment) => {
    const creator = foundComment.author.toString();

    if (userId === author) {
      Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedComment) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.status(200).json(updatedComment);
        }
      );
    } else {
      return res.status(401).json("Unauthorized access");
    }
  });
};

module.exports = {
  createComment,
  allComments,
  deleteComment,
  editComment,
};
