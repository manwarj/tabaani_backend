const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(
      id,
      {
        $set: {
          isVerified: true,
        },
      },
      {
        new: true,
      },
    );
    res.status(200).json({
      status: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Verification failed, please try again",
    });
  }
};
