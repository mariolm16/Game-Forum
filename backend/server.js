const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const routes = require("./routes");
const cors = require("cors");

require("dotenv").config();

// const corsOptions = {
//   origin: ["http://localhost:4000"],
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true, //allows session cookies to be sent back and forth
//   optionsSuccessStatus: 200, //legacy browsers
// };

app.use(cors());
app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    token = token.substring(7);
  }
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.status(401).send(`ERROR: ${err}`);
    }
    req.user = decodedUser;

    next();
  });
};

app.use("/auth", routes.auth);
app.use("/auth/verify", verifyToken, routes.auth);
app.use("/user/all", routes.user);
app.use("/user", verifyToken, routes.user);
app.use("/post/all", routes.post);
app.use("/post", verifyToken, routes.post);
app.use("/comment/all", routes.comment);
app.use("/comment", verifyToken, routes.comment);

app.listen(`${process.env.PORT}` || 4001, () => {
  console.log(`Hello Mario,I am listening on port ${process.env.PORT}`);
});
