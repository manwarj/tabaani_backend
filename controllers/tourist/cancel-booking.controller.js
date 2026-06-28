const Booking = require("../../models/Booking");

module.exports = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { id } = req.user;

    // make sure the booking belongs to this tourist
    const booking = await Booking.findOne({
      _id: bookingId,
      tourist: id,
    });

    if (!booking) {
      return res.status(404).json({
        status: false,
        error: "Booking not found",
      });
    }

    // tourist can only cancel pending or accepted bookings
    if (!["pending", "accepted"].includes(booking.status)) {
      return res.status(400).json({
        status: false,
        error: "This booking cannot be cancelled",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { status: "cancelled_by_tourist" } },
      { returnDocument: "after" },
    );

    res.status(200).json({ status: true, data: updatedBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
