const Booking = require("../../models/Booking");
const Guide = require("../../models/Guide");
module.exports = async (req, res) => {
  try {
    const { gId } = req.params;

    const { id } = req.user;
    const { startDate, endDate, message } = req.body;
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        status: false,
        error: "End date must be after start date",
      });
    }
    const guideProfile = await Guide.findById(gId);
    if (!guideProfile) {
      return res.status(404).json({ status: false, error: "Guide not found" });
    }
    const totalDays = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
    );
    const totalPrice = Number(guideProfile.price * totalDays);
    const newBooking = new Booking({
      tourist: id,
      guide: gId,
      startDate,
      endDate,
      totalPrice,
      message,
    });
    const booking = await newBooking.save();
    res.status(200).json({ status: true, data: booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
