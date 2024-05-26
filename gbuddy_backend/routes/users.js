const express = require("express");
const router = express.Router();
const getUser = require("../controllers/users/fetchUser");
const postUser = require("../controllers/users/addUser");
const editUser = require("../controllers/users/editUser");
const loginUser = require("../controllers/users/loginUser");
const otpVerify = require("../controllers/users/otpVerify");
const  sendOtp  = require("../controllers/users/sendOtp");
const existingUser = require("../controllers/users/existingUser");
const changePassword = require("../controllers/users/changePassword");
const changePasswordDirect = require("../controllers/users/changePasswordDirect");
const additionaldetails = require("../controllers/users/additionaldetails");
const { addAmount } = require("../controllers/users/addAmount");

router
  .get("/get", getUser.fetchUser)
  .post("/post", postUser.addUser)
  .patch("/edit", editUser.editUser)
  .get("/verify" , otpVerify.otpVerify)
  .post("/sendOtp" , sendOtp.sendOtp)
  .get("/exists" , existingUser.existingUser)
  .post("/changePassword" , changePassword.changePassword)
  .post("/changePasswordDirect" , changePasswordDirect.changePasswordDirect)
  .post("/additionaldetails" , additionaldetails.AdditionalDetails)
  .post("/login", loginUser.loginUser)
  .post('/addAmount',addAmount);
exports.route = router;