const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ message: "Email and Password are required" });

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser)
    return res.status(401).json({
      message: "Invalid Credentials",
    }); //Unauthorized

  if (!foundUser?.active)
    return res.status(401).json({
      success: false,
      message:
        "Your account has been suspended. Please contact support for assistance.",
    });
  //evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const name = foundUser?.name;
    const role = foundUser?.role;
    //const roles = Object.values(foundUser?.roles).filter(Boolean);
    const id = foundUser?.id;

    const accessToken = jwt?.sign(
      {
        UserInfo: {
          id: foundUser?.id,
          role: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" },
    );

    res.json({ id, role, name, accessToken });
  } else {
    res.status(401).json({
      message: "Invalid Credentials",
    });
  }
};

module.exports = { handleLogin };
