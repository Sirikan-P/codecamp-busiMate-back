const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/user-controller/booking-controller");
const { authCheck } = require("../middlewares/authCheck");

router.post("/booking/create", authCheck, bookingController.createBooking);
router.get("/booking/get", authCheck, bookingController.getBooking);
router.patch("/booking/cancel", authCheck, bookingController.cancelBooking);

// @ENDPOINT http://localhost:8877/api/user/...
//

module.exports = router;
