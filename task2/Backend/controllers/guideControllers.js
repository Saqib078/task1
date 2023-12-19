const asyncHandler = require("express-async-handler");
const Guide = require("../models/guideInfoModel");
const Otp = require("../models/otpModel");
const { constants } = require("../helper/constants");

//  FETCHING GUIDE/GUIDES INFO

//@desc Get Guides Info
//@route GET /api/guides
//@access
const getAllGuidesInfo = asyncHandler(async (req, res) => {
  try {
    const allGuides = await Guide.find();
    if (!allGuides.length) {
      res.status(constants.NOT_FOUND);
      throw new Error("No guides found");
    }
    res.status(constants.SUCCESS).json(allGuides);
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});
//@desc Get Single Guide's Info
//@route GET /api/guide
//@access
const getSingleGuideInfo = asyncHandler(async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      res.status(constants.NOT_FOUND);
      throw new Error("No guides found");
    }
    res.status(constants.SUCCESS).json(guide);
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});

// REGISTERING NEW GUIDE

//@desc Register New Guide
//@route POST /api/guide
//@access
const registerNewGuide = asyncHandler(async (req, res) => {
  try {
    //error handling for empty fields
    const { name, phone, email, avatar } = req.body;
    if (!name || !phone || !email || !avatar) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Please add all fields");
    }
    const newGuide = await Guide.create(req.body);
    res.status(constants.CREATED).json(newGuide);
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});

//DELETION OF GUIDE

//@desc Delete Guide
//@route DELETE /api/guide
//@access
const deleteGuide = asyncHandler(async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      res.status(constants.NOT_FOUND);
      throw new Error("No guides found");
    }
    await Guide.deleteOne({ _id: req.params.id });

    await Otp.deleteOne({ email: guide.email });
    res
      .status(constants.SUCCESS)
      .send("guide with id " + req.params.id + " deleted successfully");
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});

module.exports = {
  getAllGuidesInfo,
  getSingleGuideInfo,
  registerNewGuide,
  deleteGuide,
};
