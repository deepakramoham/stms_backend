const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
  },
  batch: {
    type: String,
    required: true,
    trim: true,
  },
  courses: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
