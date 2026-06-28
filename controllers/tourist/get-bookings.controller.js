const Booking = require("../../models/Booking");

module.exports = async (req, res) => {
  try {
    const { id } = req.user;

    const bookings = await Booking.find({ tourist: id })
      .populate({
        path: "guide",
        select: "-updatedAt -__v -createdAt -availability",
        populate: {
          path: "userId",
          select: "firstName lastName img",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
