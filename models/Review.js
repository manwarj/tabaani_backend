const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guides",
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookings",
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Review = mongoose.model("review", reviewSchema);
