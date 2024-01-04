const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connecté a mongoDB");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

module.exports = connectDB;
