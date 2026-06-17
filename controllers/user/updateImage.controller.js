const User = require("../../models/User");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    let { id } = req.user;
    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "No image provided" });
    }
    const user = await User.findById(id);
    const folder = `users/${id}/profile`;

    // delete old photo from Cloudinary if it's not the default one
    if (user.imgPublicId) {
      await cloudinary.deleteImage(user.imgPublicId);
    }
    const { buffer } = req.file;
    const { url, id: publicId } = await cloudinary.profileUploads(
      buffer,
      folder,
    );

    await User.findByIdAndUpdate(id, {
      $set: {
        img: url,
        imgPublicId: publicId,
      },
    });

    res
      .status(200)
      .json({ status: true, message: "Photo updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
