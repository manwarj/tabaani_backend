const User = require("../../models/User");
const Guide = require("../../models/Guide");
const verifyEmail = require("../../config/verifyEmail");
const verifyGuideEmail = require("../../config/verifyGuideEmail");
module.exports = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      date_of_birth,
      role,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: false,
        error: { email: { message: "This email is already in use" } },
      });
    }
    const userCheckPhone = await User.findOne({ phone });
    if (userCheckPhone) {
      return res.status(409).json({
        status: false,
        error: { phone: { message: "This phone is already in use" } },
      });
    }
    if (role !== "admin" && !address) {
      return res.status(400).json({
        status: false,
        error: { address: { message: "Address is a required field" } },
      });
    }
    const birthDate = new Date(date_of_birth);
    const today = new Date();
   let age = today.getFullYear() - birthDate.getFullYear();

   const monthDifference = today.getMonth() - birthDate.getMonth();

   if (
     monthDifference < 0 ||
     (monthDifference === 0 && today.getDate() < birthDate.getDate())
   ) {
     age--;
   }

   // Check if the user is at least 18
   if (age < 18) {
     return res.status(400).json({
       status: false,
       error: {
         date_of_birth: {
           message: "You must be at least 18 years old to register.",
         },
       },
     });
   }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      role,
      date_of_birth,
    });
    const createdUser = await newUser.save();
    if (role === "guide") {
      const guideProfile = new Guide({ userId: createdUser._id });
      const createdProfile = await guideProfile.save();

      // link it back to the user
      await User.findByIdAndUpdate(createdUser._id, {
        $set: { guideId: createdProfile._id },
      });
      // console.log(1)
      verifyGuideEmail(email, firstName, createdUser._id, req.get("origin"));
    } else {
      verifyEmail(email, firstName, createdUser._id, req.get("origin"));
    }
    res.status(201).json({
      status: true,
      message: "User was created successfully",
      data: {
        id: createdUser._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: false, error: error.errors });
  }
};
