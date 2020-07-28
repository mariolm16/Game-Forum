const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

router.get("/all", ctrl.user.allUsers);
router.get("/profile", ctrl.user.showUser);
router.delete("/profile", ctrl.user.deleteUser);
router.put("/profile", ctrl.user.editUser);

module.exports = router;
