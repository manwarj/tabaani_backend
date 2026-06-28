const Booking = require("../../models/Booking");

module.exports = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { guideId } = req.user;
    const { status } = req.body;

    // validate status
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        status: false,
        error: "Invalid status, must be accepted or rejected",
      });
    }

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
    // make sure booking is still pending
    if (booking.status !== "pending") {
      return res.status(400).json({
        status: false,
        error: "This booking has already been responded to",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { status } },
      { returnDocument: "after" },
    );

    res.status(200).json({ status: true, data: updatedBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
