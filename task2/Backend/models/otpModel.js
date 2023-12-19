const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  otp: {
    type: String,
    require: true,
  },
  createdAt: Date,
  expiresAt: Date,
});

module.exports = mongoose.model("Otp", otpSchema);
