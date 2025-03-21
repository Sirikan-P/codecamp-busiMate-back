
const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller/user-controller')  
const bookingController = require("../controllers/user-controller/booking-controller");
const payment = require("../controllers/payment-controller")

const { authCheck } = require("../middlewares/authCheck");

router.post("/booking/create", authCheck, bookingController.createBooking);
router.get("/booking/get", authCheck, bookingController.getBooking);
router.patch("/booking/cancel", authCheck, bookingController.cancelBooking);


router.get('/me',authCheck,userController.showUser)
router.patch('/me/edit',authCheck,userController.editUser)
router.post('/patient/add',authCheck,userController.addPatients)
router.patch('/patient/edit',authCheck,userController.editPatients)

// @ENDPOINT http://localhost:8877/api/user/...
//





//@ENDPOINT http://localhost:8877/api/user/payment/checkout
router.post('/payment/checkout' ,payment.checkOut )  
router.get('/payment/checkout-status/:session_id',payment.checkOutStatus )  

module.exports = router;
