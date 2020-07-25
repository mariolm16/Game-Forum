const express = require('express');
const router = express.Router();
const ctrl = require ('../controllers');

router.post('/', ctrl.user.createUser);
router.get('/all', ctrl.user.allUsers);
router.get('/:id', ctrl.user.showUser);
router.delete('/:id', ctrl.user.deleteUser);
router.put('/:id', ctrl.user.editUser);

module.exports = router