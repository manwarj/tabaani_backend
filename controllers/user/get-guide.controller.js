const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const guides = await User.findById(id, {
      password: 0,
      imgPublicId: 0,
      isVerified: 0,
      isBanned: 0,
    }).populate({
      path: "guideId",
    });

    res.status(200).json({ status: true, data: guides });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
