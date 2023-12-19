const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

// -------------------------------------------------
//USER
app.use("/api/users", require("./routes/userRoutes"))
// -------------------------------------------------
//GUIDE
app.use("/api/guides", require("./routes/guideRoutes"));

// -------------------------------------------------
//AUTHENTICATION
app.use("/api/otp", require("./routes/otpRoutes"));

// -------------------------------------------------
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});


exports.api =functions.https.onRequest(app);