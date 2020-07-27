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
    req.body.author = req.user._id;
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

// const allComments = (req, res) => {
//   Comment.find({}, (err, foundComments) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     res.status(200).json(foundComments);
//   });
// };

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

// works somewhat but doesnt stop spinning ie no return -- it deleted before checking to see if user is author
const deleteComment = (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, deletedComment) => {
    if (deletedComment.author === req.user._id) {
      res.status(200).json(deletedComment);
    }
    if (err) {
      return res.status(500).json(err);
    } else res.status(200).json("nice");
  });
};

// const deleteComment = (req, res) => {
//   console.log(req.user._id);
//   Comment.findById(req.params.id).then((foundComment) => {
//     console.log(foundComment.author);
//     if (foundComment.author === req.user._id) console.log("here there");
//     foundComment.remove((err, deletedComment) => {
//       if (err) {
//         return res.status(500).json(err);
//       }
//       res.status(200).json(deletedComment);
//     });
//   });
// };

// const deleteComment = (req, res) => {
//   console.log(req.user);
//   Comment.findById(req.params.id).then((foundComment) => {
//     console.log(foundComment);
//     if (foundComment.author === req.user._id) {
//       console.loglog("hiiiiiiiiiiiiiiiiii");
//       Comment.findByIdAndRemove(foundComment._id).then((deletedComment) => {
//         res.status(200).json(deletedComment);
//       });
//     } else {
//       return res.status(500).json("something is broken");
//     }
//   });
// };

module.exports = {
  createComment,
  allComments,
  deleteComment,
};
