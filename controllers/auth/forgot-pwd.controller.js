const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const forgotEmail = require("../../config/forgot-pwd-email");
const RESET_SECRET = process.env.RESET_SECRET;
module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: false, message: "No user found" });
    }
    const resetToken = jwt.sign(
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
    forgotEmail(
      user.email,
      user.firstName,
      user._id,
      resetToken,
      req.get("origin"),
    );
    res
      .status(200)
      .json({ status: true, message: "Reset link sent to your email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};
