const Guide = require("../../models/Guide");
const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    let { guideId } = req.user;
    const { bio, languages, availability, price, location } = req.body;
    // console.log({ languages });
    const data = await Guide.findByIdAndUpdate(
      guideId,
      {
        $set: {
          bio,
          languages,
          availability,
          price,
          location,
        },
      },
      { returnDocument: "after", runValidators: true },
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
