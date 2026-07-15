const User = require("../../models/User");
const bcrypt = require("bcrypt");
const updatedPassword = require("../../config/updatedPassword");
module.exports = async (req, res) => {
  try {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(id);

    const isMatch = bcrypt.compareSync(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, error: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save(); // triggers pre-save hook to hash it
    updatedPassword(
      user.email,
      user.firstName,
      user.lastName,
      id,
      req.get("origin"),
    );
    res
      .status(200)
      .json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
