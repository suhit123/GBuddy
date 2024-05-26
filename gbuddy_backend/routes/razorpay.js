
const express = require("express");
const razorpayHandler = require("../controllers/razorpay");

const routes = express.Router();
routes.post('/razorpay',razorpayHandler.razorpayHandler);

exports.route = routes;
