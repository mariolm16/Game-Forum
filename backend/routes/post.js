const express = require('express');
const router = express.Router();
const ctrl = require ('../controllers');

router.post('/', ctrl.post.createPost);
router.get('/all', ctrl.post.allPosts);
router.get('/:id', ctrl.post.showPost);
router.delete('/:id', ctrl.post.deletePost);
router.put('/:id', ctrl.post.editPost);

module.exports = router