const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: [2, "First Name length must have at least 3 characters"],
      required: [true, "First Name is a required field"],
    },
    lastName: {
      type: String,
      minLength: [2, "Last Name length must have at least 3 characters"],
      required: [true, "Last Name is a required field"],
    },
    email: {
      type: String,
      index: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Invalid email, please try again",
      ],
      required: [true, "Email is a required field"],
    },
    password: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v,
          );
        },
        message: () =>
          `Invalid Password: minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
      },
      required: [true, "Password is a required field"],
    },
    phone: {
      type: String,
      index: true,
      required: [true, "Phone is a required field"],
    },
    img: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    },
    imgPublicId: {
      type: String,
      default: null,
    },
    address: {
      type: {
        house_nbr: {
          type: String,
        },
        street: {
          type: String,
        },
        post_code: {
          type: String,
        },
        city: { type: String, required: [true, "City is a required field"] },
        _id: false,
      },
    },
    date_of_birth: {
      type: Date,
      required: [true, "Date of Birth is a required field"],
    },
    role: {
      type: String,
      enum: ["tourist", "guide", "admin"],
      required: [true, "Role is a required field"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
module.exports = User = mongoose.model("users", userSchema);
