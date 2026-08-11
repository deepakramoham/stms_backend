const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 1000 });
  // const users = await User.aggregate([
  //   {
  //     $match: {
  //       role: 1000,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "tasks",
  //       let: { userId: "$_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $eq: [{ $toObjectId: "$userId" }, "$$userId"],
  //             },
  //           },
  //         },
  //       ],
  //       as: "tasks",
  //     },
  //   },
  //   {
  //     $addFields: {
  //       taskCount: {
  //         $size: "$tasks",
  //       },
  //     },
  //   },
  //   {
  //     $project: {
  //       password: 0,
  //       tasks: 0,
  //     },
  //   },
  // ]);
  if (!users) return res.status(204).json({ message: "No users found" });

  res.json(users);
};

const suspendUser = async (req, res, next) => {
  if (!req?.params?._id) {
    return res.status(400).json({ message: "User Id is required" });
  }

  try {
    const user = await User.findOne({ _id: req.params._id }).exec();

    if (!user) {
      return res
        .status(204)
        .json({ message: `No user matches with id ${req.params?._id}` });
    }
    if (req.params._id) user.active = !user.active;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  suspendUser,
};
