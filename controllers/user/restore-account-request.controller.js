const User = require("../../models/User");
const Guide = require("../../models/Guide");
const jwt = require("jsonwebtoken");
const RESET_SECRET = process.env.RESET_SECRET;
const restoreAccountEmail = require("../../config/restore-email");
module.exports = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ status: false, message: "No user found" });
  }
  const restoreToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    RESET_SECRET,
    {
      expiresIn: "30m",
    },
  );
  restoreAccountEmail(
    user.email,
    user.firstName,
    restoreToken,
    req.get("origin"),
  );
  res
    .status(200)
    .json({ status: true, message: "Restore link sent to your email" });

  try {
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
