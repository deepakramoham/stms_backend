const Student = require("../model/Student");

const getAllStudents = async (req, res) => {
  const students = await Student.find();
  if (!students) return res.status(204).json({ message: "No students found" });

  res.json(students);
};

const addStudent = async (req, res, next) => {
  if (!req?.body?.studentName) {
    return res.status(400).json({ message: "Student name is required" });
  }

  const { studentName, occupation, batch, courses } = req.body;
  try {
    const student = await Student.create({
      studentName,
      occupation,
      batch,
      courses: courses?.length > 0 ? courses : [],
    });
    res.status(201).json({
      success: true,
      message: "New student created successfully",
      student, // sending the newly created student
    });
  } catch (err) {
    next(err);
  }
};

const updateStudent = async (req, res, next) => {
  console.log(req?.params?._id);
  console.log(req.body);
  if (!req?.params?._id) {
    return res.status(400).json({ message: "Student Id is required" });
  }
  const { studentName, occupation, batch, courses } = req.body;

  try {
    const student = await Student.findOne({ _id: req.params._id }).exec();

    if (!student) {
      return res
        .status(204)
        .json({ message: `No student matches with id ${req.params?._id}` });
    }
    if (req.body.studentName) student.studentName = studentName;
    if (req.body.occupation) student.occupation = occupation;
    if (req.body.batch) student.batch = batch;
    if (req.body.courses) student.courses = courses;
    const updatedStudent = await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (req, res) => {
  if (!req?.params?._id) {
    return res.status(400).json({ message: "Student Id required" });
  }
  const student = await Student.findOne({ _id: req.params._id }).exec();

  if (!student) {
    return res
      .status(400)
      .json({ message: `Student Id ${req.params._id} not found` });
  }
  const result = await Student.deleteOne({ _id: req.params._id });
  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    deletedId: req.params._id,
  });
};

module.exports = { getAllStudents, addStudent, updateStudent, deleteStudent };
