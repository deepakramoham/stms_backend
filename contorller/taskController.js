const Task = require("../model/Task");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  if (!tasks) return res.status(204).json({ message: "No tasks found" });

  res.json(tasks);
};

const addTask = async (req, res, next) => {
  if (!req?.body?.taskName) {
    return res.status(400).json({ message: "Task name is required" });
  }

  const { taskName } = req.body;
  try {
    const task = await Task.create({
      taskName,
    });
    res.status(201).json({
      success: true,
      message: "New task created successfully",
      task, // sending the newly created student
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  if (!req?.params?._id) {
    return res.status(400).json({ message: "Task Id is required" });
  }
  const { taskName } = req.body;

  try {
    const task = await Task.findOne({ _id: req.params._id }).exec();

    if (!task) {
      return res
        .status(204)
        .json({ message: `No task matches with id ${req.params?._id}` });
    }
    if (req.body.taskName) task.taskName = taskName;
    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res) => {
  if (!req?.params?._id) {
    return res.status(400).json({ message: "Task Id required" });
  }
  const task = await Task.findOne({ _id: req.params._id }).exec();

  if (!task) {
    return res
      .status(400)
      .json({ message: `Task Id ${req.params._id} not found` });
  }
  const result = await Task.deleteOne({ _id: req.params._id });
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    deletedId: req.params._id,
  });
};

module.exports = { getAllTasks, addTask, updateTask, deleteTask };
