const express = require("express");
const router = express.Router();
const verifyRoles = require("./../../../middleware/verifyRoles");
const userController = require("../../../contorller/usersController");

router.get("/", verifyRoles(1100), userController.getAllUsers);
router.put("/:_id", verifyRoles(1100), userController.suspendUser);

// router.delete(
//   "/:_id",
//   //verifyRoles(ROLES_LIST.Admin),

// );

module.exports = router;
