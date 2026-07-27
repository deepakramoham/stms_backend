const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and Password are required" });
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    //create and store in mongoDB

    await User.create({
      name,
      email,
      password: hashedPwd,
      role,
    });

    res
      .status(201)
      .json({ success: `New user with email Id:${email} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
