const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const guideSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

module.exports = Guide = mongoose.model("guides", guideSchema);
