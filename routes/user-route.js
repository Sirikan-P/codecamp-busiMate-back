const express = require("express")
const router = express.Router()
const userController = require("../controllers/user-controller/booking-controller")


router.post("/booking/create", userController.createBooking)
router.get("/booking/get", userController.getBooking)
router.patch("/booking/cancel", userController.cancelBooking)


// @ENDPOINT http://localhost:8877/api/user/...
//

module.exports = router


