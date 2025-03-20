
const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller/user-controller')  
const bookingController = require("../controllers/user-controller/booking-controller");
const { authCheck } = require("../middlewares/authCheck");
const reviewController = require("../controllers/user-controller/review-controller")
const { authUser } = require("../middlewares/auth-user");


router.post("/booking/create", authCheck, bookingController.createBooking);
router.get("/booking/get", authCheck, bookingController.getBooking);
router.patch("/booking/cancel", authCheck, bookingController.cancelBooking);

router.post("/review",authCheck,reviewController.createReview)
router.get("/review/:id",authCheck,reviewController.getReviewById);
router.get("/review/driver/:driverId",authCheck,reviewController.getReviewByDriverId);
router.get("/review/driver/:driverId/average",authCheck,reviewController.getAverageDriverRating);




router.get('/me',authCheck,userController.showUser)
router.patch('/me/edit',authCheck,userController.editUser)
router.post('/patient/add',authCheck,userController.addPatients)
router.patch('/patient/edit',authCheck,userController.editPatients)

// @ENDPOINT http://localhost:8877/api/user/...
//

module.exports = router;
