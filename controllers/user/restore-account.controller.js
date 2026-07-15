const User = require("../../models/User");
module.exports = async (req, res) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        isDeleted: false,
      },
    },
    { returnDocument: "after", runValidators: true },
  );
  if (!user) {
    return res.status(401).json({ status: false, message: "No user found" });
  }
  res.status(200).json({ status: true, message: "Your profile was restored" });

  try {
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
