const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/:comment', ctrl.reply.createReply)

module.exports = router;