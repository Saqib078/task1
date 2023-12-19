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
    },
    // STORES IN BASE64 FORMAT (AVATAR)
    phone: {
      type: String,
      require: [true, "Please add the phone number"],
    },
    comment: {
      type: String,
      require: [true, "Please add your comment"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", userSchema, "contact");
