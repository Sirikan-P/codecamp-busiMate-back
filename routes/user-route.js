const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/user-controller/booking-controller");
const { checkAuth } = require("../middlewares/authCheck");

router.post("/booking/create", checkAuth, bookingController.createBooking);
router.get("/booking/get", checkAuth, bookingController.getBooking);
router.patch("/booking/cancel", checkAuth, bookingController.cancelBooking);
router.get("/booking/chat/:driverId", checkAuth, bookingController.getBookingForChat);

module.exports = router;