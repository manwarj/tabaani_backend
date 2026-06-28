const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guides",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "completed",
        "cancelled_by_tourist",
        "cancelled_by_guide",
      ],
      default: "pending",
    },
    message: {
      type: String,
    },
    reviewEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Booking = mongoose.model("booking", bookingSchema);
