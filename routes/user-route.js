
const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller/user-controller')  
const bookingController = require("../controllers/user-controller/booking-controller");
const { authCheck } = require("../middlewares/authCheck");
const upload = require("../middlewares/upload");


router.post("/booking/create", authCheck, upload.single("appointmentImage"),bookingController.createBooking);
router.get("/booking/get", authCheck, bookingController.getBooking);
router.get("/booking/get/:id", authCheck, bookingController.getOneBooking);
router.patch("/booking/cancel", authCheck, bookingController.cancelBooking);
router.get("/hospital", bookingController.getHospital);
router.get("/useraddress",authCheck, bookingController.getUserAddress);
router.post("/booking/finddriver",authCheck, bookingController.findDriver);
 

router.get('/me',authCheck,userController.showUser)
router.patch('/me/edit',authCheck,userController.editUser)
router.post('/patient/add',authCheck,userController.addPatients)
router.patch('/patient/edit',authCheck,userController.editPatients)
router.get('/patient',authCheck,userController.getPatients)

// @ENDPOINT http://localhost:8877/api/user/...
//

module.exports = router;
