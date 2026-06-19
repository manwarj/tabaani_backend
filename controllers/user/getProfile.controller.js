const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    let { id } = req.user;
    const user = await User.findById(id, {
      password: 0,
      imgPublicId: 0,
    }).populate("guideId");
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
