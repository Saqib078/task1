const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    //UNIQUE ID, CAN BE USED FOR DATA MANIPULATIONS
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    name: {
      type: String,
      require: [true, "Please add the user's name"],
    },
    email: {
      type: String,
      require: [true, "Please add the email"],
      unique: true,
    },
    // STORES IN BASE64 FORMAT (AVATAR)
    password: {
      type: String,
      require: [true, "Please add the password"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema, "users");
