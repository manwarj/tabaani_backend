const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guideSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bio: {
      type: String,
    },
    languages: {
      type: [String],
    },
    price: {
      type: Number,
    },
    location: {
      city: { type: String },
      country: { type: String },
    },
    availability: {
      type: [Date],
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Guide = mongoose.model("guides", guideSchema);
