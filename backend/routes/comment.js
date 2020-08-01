const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

router.post("/:post", ctrl.comment.createComment);
router.get("/", ctrl.comment.allComments);
router.get("/reply/:id", ctrl.comment.getReply);
router.delete("/:id", ctrl.comment.deleteComment);
router.put("/:id", ctrl.comment.editComment);

module.exports = router;
