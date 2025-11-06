const express = require("express");
const router = express.Router();
const studentController = require("../../contorller/studentController");

//const ROLES_LIST = require("../../config/roles_list");
//const verifyRoles = require("../../middleware/verifyRoles");
//const path = require("path");
//const fs = require("fs");

// Route Handlers
router.get("/", studentController.getAllStudents);
// router.get("/:_id", studentController.getSubject);
// router.get("/", subjectController.getAllSubjects);
router.post(
  "/",

  studentController.addStudent
);

router.put(
  "/:_id",
  //   verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Employee),
  studentController.updateStudent
);

router.delete(
  "/:_id",
  //verifyRoles(ROLES_LIST.Admin),
  studentController.deleteStudent
);

module.exports = router;
