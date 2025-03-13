const express = require("express")
const router = express.Router()
const bookingController = require("../controllers/user-controller/booking-controller")
const {authCheck} = require("../middlewares/authCheck")


router.post("/booking/create",authCheck, userController.createBooking)
router.get("/booking/get", authCheck, userController.getBooking)
router.patch("/booking/cancel",authCheck, userController.cancelBooking)


// @ENDPOINT http://localhost:8877/api/user/...
//

module.exports = router


