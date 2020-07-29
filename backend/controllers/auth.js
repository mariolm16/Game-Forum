const User = require("../models").User;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const signup = (req, res) => {
  console.log(req.body)
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(500).json(err);
    }
    console.log("hello this is an error")
    bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log("hello this is an error too")

      req.body.password = hashedPwd;
      User.create(req.body, (err, newUser) => {
        if (err) {
          return res.status(500).json(err);
        }
        console.log(newUser)
        const token = jwt.sign(
          {
            username: newUser.username,
            _id: newUser._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "30 days",
          }
        );
        res.status(200).json({
          user: newUser,
          token: token,
        });
      })
      // .catch((err) => {
      //   res.status(500);
      // });
    });
  });
};

const login = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((foundUser) => {
      if (foundUser) {
        bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
          if (match) {
            const token = jwt.sign(
              {
                username: foundUser.username,
                id: foundUser._id,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "30 days",
              }
            );
            res.status(200).json({
              foundUser,
              token: token,
            });
          } else {
            res.status(500).send(`ERROR: Incorrect Password`);
          }
        });
      } else {
        res.status(500).send(`ERROR: Incorrect Username`);
      }
    })
    .catch((err) => {
      res.status(500).send(`ERROR: internal server error: ${err}`);
    });
};

const verifyUser = (req, res) => {
  console.log(req.user)
  User.findById(req.user.id)

    .then((foundUser) => {
      console.log(foundUser)
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      res.status(500).send(`ERROR: oh no`);
    });
};

module.exports = {
  signup,
  verifyUser,
  login,
};
