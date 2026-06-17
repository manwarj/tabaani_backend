const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
const getFileHash = (buffer) => {
  return crypto.createHash("md5").update(buffer).digest("hex");
};
// for later use
exports.uploads = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const fileHash = getFileHash(fileBuffer);

    cloudinary.api
      .resource(`${folder}/${fileHash}`)
      .then((existing) => {
        resolve({
          exists: true,
          url: existing.url,
          id: existing.public_id,
          message: "Image already exists.",
        });
      })
      .catch((err) => {
        if (err.error && err.error.http_code === 404) {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              public_id: fileHash,
              folder: folder,
              resource_type: "image",
              transformation: [
                { gravity: "auto", height: 250, width: 270, crop: "fill" },
                { quality: "auto" },
              ],
            },
            (error, result) => {
              if (error) return reject(error);
              resolve({
                exists: false,
                url: result.url,
                publicId: result.public_id,
                message: "Image uploaded successfully.",
              });
            },
          );
          uploadStream.end(fileBuffer);
        } else {
          console.log("cloud reject error");
          reject(err);
        }
      });
  });
};

// profile picture upload
exports.profileUploads = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const fileHash = getFileHash(fileBuffer);

    cloudinary.api
      .resource(`${folder}/${fileHash}`)
      .then((existing) => {
        resolve({
          exists: true,
          url: existing.url,
          id: existing.public_id,
          message: "Image already exists.",
        });
      })
      .catch((err) => {
        if (err.error && err.error.http_code === 404) {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              public_id: fileHash,
              folder: folder,
              resource_type: "image",
              transformation: [
                { gravity: "face", height: 150, width: 150, crop: "thumb" },
                { radius: "max" },
                { quality: "auto" },
              ],
            },
            (error, result) => {
              if (error) return reject(error);
              resolve({
                exists: false,
                url: result.url,
                id: result.public_id,
                message: "Image uploaded successfully.",
              });
            },
          );
          uploadStream.end(fileBuffer);
        } else {
          console.log("cloud reject error");
          reject(err);
        }
      });
  });
};

exports.deleteImage = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};
