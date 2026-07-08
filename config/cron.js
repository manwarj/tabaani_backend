const cron = require("node-cron");
const Booking = require("../models/Booking");
const User = require("../models/User");
const reviewEmail = require("../config/reviewEmail");
const origin = process.env.CLIENT_URL;
// runs every day at midnight
cron.schedule("0 0 * * *", async () => {
  const completedBookings = await Booking.updateMany(
    {
      status: "accepted",
      endDate: { $lt: new Date() },
    },
    {
      $set: { status: "completed" },
    },
  );

  // fetch the updated bookings to send emails
  const bookings = await Booking.find({
    status: "completed",
    endDate: { $lt: new Date() },
    reviewEmailSent: false,
  })
    .populate("tourist")
    .populate({
      path: "guide",
      populate: {
        path: "userId",
        select:'-password'
      }
    });

  for (const booking of bookings) {
    reviewEmail(
      booking.tourist.email,
      booking.tourist.firstName,
      booking.guide.userId.firstName,
      booking._id,
      origin,
    );

    await Booking.findByIdAndUpdate(booking._id, {
      $set: { reviewEmailSent: true },
    });
  }

  console.log("Completed bookings updated and emails sent ✅");
});
