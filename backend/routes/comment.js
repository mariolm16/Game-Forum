const express = require('express');
const router = express.Router();
const ctrl = require ('../controllers');

router.post('/', ctrl.comment.createComment);
router.get('/all', ctrl.comment.allComments);
router.delete('/:id', ctrl.comment.deleteComment);

module.exports = router