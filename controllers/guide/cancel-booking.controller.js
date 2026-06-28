const Booking = require("../../models/Booking");

module.exports = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { guideId } = req.user;

    // make sure the booking belongs to this guide
    const booking = await Booking.findOne({
      _id: bookingId,
      guide: guideId,
    });

    if (!booking) {
      return res.status(404).json({
        status: false,
        error: "Booking not found",
      });
    }

    // guide can only cancel accepted bookings
    if (booking.status !== "accepted") {
      return res.status(400).json({
        status: false,
        error: "You can only cancel accepted bookings",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { status: "cancelled_by_guide" } },
      { returnDocument: "after" },
    );

    res.status(200).json({ status: true, data: updatedBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
