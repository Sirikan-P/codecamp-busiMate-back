const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller/user-controller')  
const bookingController = require("../controllers/user-controller/booking-controller");
const payment = require("../controllers/payment-controller")

const { authCheck } = require("../middlewares/authCheck");
const reviewController = require("../controllers/user-controller/review-controller")
const { authUser } = require("../middlewares/auth-user");
const upload = require("../middlewares/upload");



router.post("/booking/create", authCheck, upload.single("appointmentImage"),bookingController.createBooking);
router.post("/review",authCheck,reviewController.createReview)
router.get("/review/:id",authCheck,reviewController.getReviewById);
router.get("/review/driver/:driverId",authCheck,reviewController.getReviewByDriverId);
router.get("/review/driver/:driverId/average",authCheck,reviewController.getAverageDriverRating);

router.get("/booking/get", authCheck, bookingController.getBooking);
router.get("/booking/get/:id", authCheck, bookingController.getOneBooking);
router.patch("/booking/cancel", authCheck, bookingController.cancelBooking);
router.get("/hospital", bookingController.getHospital);
router.get("/useraddress",authCheck, bookingController.getUserAddress);
router.post("/booking/finddriver",authCheck, bookingController.findDriver);
router.post("/booking/findNewdriver",authCheck, bookingController.findNewDriver);
router.patch("/booking/updateNewdriver",authCheck, bookingController.UpdateNewDriver);
 

router.get('/me',authCheck,userController.showUser)
router.patch('/me/edit',authCheck,userController.editUser)
router.post('/me/profile/upload',authCheck,upload.single('profileImageUrl'),userController.editProfileImage)
router.post('/patient/add',authCheck,userController.addPatients)
router.patch('/patient/edit/:id',authCheck,userController.editPatients)
router.get('/patient',authCheck,userController.getPatients)
router.get('/patient/:id',authCheck,userController.getByPatientId)
router.patch('/patient/edit',authCheck,userController.editPatients)

// @ENDPOINT http://localhost:8877/api/user/...
//





//@ENDPOINT http://localhost:8877/api/user/payment/checkout
router.post('/payment/checkout' ,payment.checkOut )  
router.get('/payment/checkout-status/:session_id',payment.checkOutStatus )  

module.exports = router;
