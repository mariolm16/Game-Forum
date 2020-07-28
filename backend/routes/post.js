const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

router.get("/", ctrl.post.allPosts);

router.get("/:id", ctrl.post.showPost);
router.post("/new", ctrl.post.createPost);
router.delete("/:id", ctrl.post.deletePost);
router.put("/:id", ctrl.post.editPost);

module.exports = router;
