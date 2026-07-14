const User = require("../../models/User");
const Guide = require("../../models/Guide");
module.exports = async (req, res) => {
  const { id } = req.user;

  await User.findByIdAndUpdate(id, {
    $set: {
      isDeleted: true,
    },
  });
  res
    .status(200)
    .json({ status: true, message: "Your profile was deleted successfully" });

  try {
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
