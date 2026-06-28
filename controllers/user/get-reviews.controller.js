const Review = require("../../models/Review");

module.exports = async (req, res) => {
  try {
    const { guideId } = req.params;

    const reviews = await Review.find({ guide: guideId })
      .populate("tourist", "firstName lastName img")
      .sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: reviews });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
