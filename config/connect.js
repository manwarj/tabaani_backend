const mongoose = require("mongoose");
const connect = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log(`coonected to DB 🚀`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connect;
