const Admin = require("../../controllers/admin");
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
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(409).json({
        status: false,
        error: { email: { message: "This email is already in use" } },
      });
    }
    const adminCheckPhone = await Admin.findOne({ phone });
    if (adminCheckPhone) {
      return res.status(409).json({
        status: false,
        error: { phone: { message: "This phone is already in use" } },
      });
    }
    if (!address) {
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
    const newAdmin = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      role,
      date_of_birth,
    });
    const createdAdmin = await newAdmin.save();

    res.status(201).json({
      status: true,
      message: "User was created successfully",
      data: {
        id: createdAdmin._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: false, error: error.errors });
  }
};
