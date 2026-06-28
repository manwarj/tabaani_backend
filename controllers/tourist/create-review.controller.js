const Review = require("../../models/Review");
const Booking = require("../../models/Booking");
const Guide = require("../../models/Guide");
module.exports = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rating, comment } = req.body;
    const { id } = req.user;
    const booking = await Booking.findOne({
      _id: bookingId,
      tourist: id,
    });
    if (!booking) {
      return res
        .status(404)
        .json({ status: false, error: "Booking not found" });
    }

    // 2. is the booking completed?
    if (booking.status !== "completed") {
      return res.status(400).json({
        status: false,
        error: "You can only review completed bookings",
      });
    }

    // 3. has the tourist already reviewed this booking?
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(409).json({
        status: false,
        error: "You have already reviewed this booking",
      });
    }
    const guideId = booking.guide;
    const newReview = new Review({
      tourist: id,
      guide: guideId,
      booking: bookingId,
      rating,
      comment,
    });
    const savedReview = await newReview.save();
    const guide = await Guide.findById(guideId);
    const newTotalRating = guide.totalRating + Number(rating);
    const newReviewCount = guide.reviewCount + 1;
    const newRating = newTotalRating / newReviewCount;

    await Guide.findByIdAndUpdate(guideId, {
      $set: {
        totalRating: newTotalRating,
        reviewCount: newReviewCount,
        rating: newRating,
      },
    });
    res.status(201).json({
      status: true,
      message: "Your review was submitted succcesfully",
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
