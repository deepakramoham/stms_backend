const express = require("express");
const router = express.Router();
const taskController = require("../../../contorller/taskController");
const multer = require("../../../middleware/multer");

//const ROLES_LIST = require("../../config/roles_list");
//const verifyRoles = require("../../middleware/verifyRoles");
//const path = require("path");
//const fs = require("fs");

// Route Handlers
router.get("/", taskController.getAllTasksById);
// router.get("/:_id", taskController.getSubject);
// router.get("/", subjectController.getAllSubjects);

router.get("/:taskId", taskController?.getTaskById);
router.post("/", multer.none(), taskController.addTask);

router.put(
  "/:_id",
  multer.none(),
  //   verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Employee),
  taskController.updateTask,
);

router.delete(
  "/:_id",
  //verifyRoles(ROLES_LIST.Admin),
  taskController.deleteTask,
);

module.exports = router;
