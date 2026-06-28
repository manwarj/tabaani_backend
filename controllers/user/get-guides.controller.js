const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const { location, language, minPrice, maxPrice, rating } = req.query;

    // build guide filter
    const guideFilter = {};
    if (location) guideFilter.location = { $regex: location, $options: "i" };
    if (language) {
      const languagesArray = language.split(",");
      guideFilter.languages = { $in: languagesArray };
    }
    if (minPrice || maxPrice) {
      guideFilter.price = {};
      if (minPrice) guideFilter.price.$gte = Number(minPrice);
      if (maxPrice) guideFilter.price.$lte = Number(maxPrice);
    }
    if (rating) guideFilter.rating = { $gte: Number(rating) };

    const guides = await User.find(
      { role: "guide", isBanned: false },
      {
        password: 0,
        imgPublicId: 0,
        isVerified: 0,
        isBanned: 0,
      },
    ).populate({
      path: "guideId",
      match: guideFilter,
    });

    // remove users where guideId is null (didn't match the filter)
    const filteredGuides = guides.filter((guide) => guide.guideId !== null);

    res.status(200).json({ status: true, data: filteredGuides });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
