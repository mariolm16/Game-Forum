const User = require("../models").User;
const Post = require("../models").Post;

const showUser = (req, res) => {
  User.findById(req.user._id)
    .populate("_posts", "title")
    .exec((err, foundUser) => {
      if (err) {
        console.log("something is happening...");
        return res.status(500).json(err);
      }
      console.log(foundUser);
      res.status(200).json(foundUser);
    });
};

const allUsers = (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      return res.status(500).json(err);
    }
    console.log(foundUsers);
    res.status(200).json(foundUsers);
  });
};

const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.user.id, (err, deletedUser) => {
    if (err) {
      return res.status(500).json(err);
    }
    console.log(deletedUser);
    res.status(200).json(deletedUser);
  });
};

const editUser = (req, res) => {
  console.log(req.user);
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(updatedUser);
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
