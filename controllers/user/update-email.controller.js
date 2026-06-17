const User = require("../../models/User");
const updatedEmail = require("../../config/updatedEmail");

module.exports = async (req, res) => {
  try {
    const { id } = req.user;
    const { newEmail } = req.body;

    const existedEmail = await User.findOne({
      email: newEmail,
    });
    if (existedEmail) {
      return res
        .status(409)
        .json({ status: false, error: "Email already exists" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          email: newEmail,
          isVerified: false,
        },
      },
      { returnDocument: "after" },
    );
    updatedEmail(newEmail, user.firstName, id, req.get("origin"));
    res
      .status(200)
      .json({
        status: true,
        message:
          "Your email was updated successfully! Please check your mailbox",
      });
  } catch (error) {
    // console.log(error);
    res.status(404).json({ status: false, error: error.message });
  }
};
