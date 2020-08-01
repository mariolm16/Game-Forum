const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/:comment', ctrl.reply.createReply)
router.get('/single/:id', ctrl.reply.getReply)
router.delete('/single/:id', ctrl.reply.deleteReply)

module.exports = router;