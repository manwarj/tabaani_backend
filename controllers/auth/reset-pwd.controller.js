const User = require("../../models/User");
const updatedPassword = require("../../config/updatedPassword");
module.exports = async (req, res) => {
  try {
    const { newPwd } = req.body;
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user.isVerified) {
      return res.status(403).json({
        status: false,
        message: "Your account is not verified",
      });
    }

    user.password = newPwd;
    await user.save();
    updatedPassword(
      user.email,
      user.firstName,
      user.lasttName,
      req.get("origin"),
    );
    return res.status(200).json({
      status: true,
      message: "Your password was updated successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
