const User = require("../models").User;
const Post = require("../models").Post;

const showUser = (req, res) => {
  console.log(req.user)
  User.findById(req.user.id)
    .populate("_posts", "title")
    .exec((err, foundUser) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(foundUser);
    });
};

const allUsers = (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(foundUsers);
  });
};

const deleteUser = (req, res) => {
  console.log(req.user)
  User.findByIdAndRemove(req.user.id, (err, deletedUser) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(deletedUser);
  });
};

const editUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(updatedUser);
    }
  );
};

module.exports = {
  showUser,
  allUsers,
  deleteUser,
  editUser,
};
