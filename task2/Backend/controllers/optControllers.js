const asyncHandler = require("express-async-handler");
const Otp = require("../models/otpModel");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const { hashData, verifyHashedData } = require("../utils/hashData");

const sendOtp = asyncHandler(
  async ({ email, subject, message, duration = 1 }) => {
    try {
      if (!email || !subject || !message) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Please add all fields");
      }
      //delete any old OTP record
      await Otp.deleteOne({ email });

      //generate new OTP
      const generatedOTP = await generateOTP();

      //send email
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject,
        html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
      };
      await sendEmail(mailOptions);

      //save the OTP in DB
      const hashedOTP = await hashData(generatedOTP);
      const newOTP = await new Otp({
        email,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000 + duration,
      });

      const createdOTPRecord = await newOTP.save();
      return createdOTPRecord;
    } catch (err) {
      throw err;
    }
  }
);

const verifyOtp = asyncHandler(async ({ email, otp }) => {
  try {
    if (!email || !otp) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Please add all fields");
    }
    const userOTPRecord = await Otp.findOne({ email });
    if (!userOTPRecord) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("No OTP records found");
    }

    const { expiresAt } = userOTPRecord;

    //checking if OTP is expired
    if (expiresAt < Date.now()) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("OTP expired");
    }

    //if its not expired, comparing the OTP
    const hashedOTP = userOTPRecord.otp;
    const validOTP = await verifyHashedData(otp, hashedOTP);

    return validOTP;
  } catch (err) {
    throw err;
  }
});
module.exports = { sendOtp, verifyOtp };
