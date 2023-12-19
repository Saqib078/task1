const mongoose = require("mongoose");

const guideInfoSchema = new mongoose.Schema(
  {
    //UNIQUE ID, CAN BE USED FOR DATA MANIPULATIONS
    guide_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    name: {
      type: String,
      require: [true, "Please add the guide's name"],
    },
    phone: {
      type: String,
      require: [true, "Please add the guide's phone number"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Please add the guide's email"],
      unique: true,
    },
    // STORES IN BASE64 FORMAT (AVATAR)
    avatar: {
      type: String,
      require: [true, "Please add the guide's avatar"],
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

module.exports = mongoose.model("Guide", guideInfoSchema, "guides");
