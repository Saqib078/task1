const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Contact = require("../models/contactModel")
const Otp = require("../models/otpModel");
const { constants } = require("../helper/constants");

//  FETCHING USER INFO


//@desc Get Single USER's Info
//@route GET /api/user
//@access
const getUserInfo = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user || user.password !== password) {
      res.status(constants.NOT_FOUND).json({ error: "Invalid credentials" });
      return; // Return here to avoid further execution
    }

    res.status(constants.SUCCESS).json(user);
  } catch (err) {
    res.status(constants.SERVER_ERROR).json({ error: err.message });
  }
});


// REGISTERING NEW USER

//@desc Register New User
//@route POST /api/user
//@access
const registerUser = asyncHandler(async (req, res) => {
  try {
    //error handling for empty fields
    const { name, phone, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Please add all fields");
    }
    const newUser = await User.create(req.body);
    res.status(constants.CREATED).json(newUser);
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});

//DELETION OF USER

//@desc Delete User
//@route DELETE /api/user
//@access
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(constants.NOT_FOUND);
      throw new Error("No user found");
    }
    await User.deleteOne({ _id: req.params.id });

    await Otp.deleteOne({ email: user.email });
    res
      .status(constants.SUCCESS)
      .send("user with id " + req.params.id + " deleted successfully");
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});



//Contact Us

//@desc  Contact Us
//@route POST /api/users/contactUs
//@access

const contactUs = asyncHandler(async (req, res) => {
  try {
    //error handling for empty fields
    const { name, email, phone, comment } = req.body;
    if (!name || !email || !phone || !comment) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Please add all fields");
    }
    const newUser = await Contact.create(req.body);
    res.status(constants.CREATED).json(newUser);
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});

module.exports = {
  getUserInfo,
  registerUser,
  deleteUser,
  contactUs,
};