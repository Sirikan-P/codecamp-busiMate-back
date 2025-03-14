const express = require('express')
const router = express.Router()
const bookingController = require("../controllers/user-controller/booking-controller")
const userController = require('../controllers/user-controller/user-controller')    
const {authCheck} = require("../middlewares/authCheck")


router.post("/booking/create",authCheck, bookingController.createBooking)
router.get("/booking/get", authCheck, bookingController.getBooking)
router.patch("/booking/cancel",authCheck, bookingController.cancelBooking)



router.get('/me',authCheck,userController.showUser)
router.patch('/me/edit',authCheck,userController.editUser)
router.post('/patient/add',authCheck,userController.addPatients)
router.patch('/patient/edit',authCheck,userController.editPatients)

// @ENDPOINT http://localhost:8877/api/user/...
//

module.exports = router


