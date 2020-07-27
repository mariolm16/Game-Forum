const express = require('express');
const router = express.Router();
const ctrl = require ('../controllers');

//test show all
router.get('/all', ctrl.user.allUsers);


router.get('/:id', ctrl.user.showUser);

//test
router.delete('/:id', ctrl.user.deleteUser);

router.put('/profile', ctrl.user.editUser);

module.exports = router