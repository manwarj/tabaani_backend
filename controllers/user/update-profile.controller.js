const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    let { id } = req.user;
    const { firstName, lastName, phone, address, date_of_birth } = req.body;
    const data = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          ...req.body,
        },
      },
      { returnDocument: "after" , runValidators: true },
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
