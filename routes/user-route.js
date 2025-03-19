const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller/user-controller')  
const bookingController = require("../controllers/user-controller/booking-controller");
const { authCheck } = require("../middlewares/authCheck");

router.post("/booking/create", authCheck, bookingController.createBooking);
router.get("/booking/get", authCheck, bookingController.getBooking);
router.patch("/booking/cancel", authCheck, bookingController.cancelBooking);
router.get("/hospital", bookingController.getHospital);
router.get("/useraddress",authCheck, bookingController.getUserAddress);
 

router.get('/me',authCheck,userController.showUser)
router.patch('/me/edit',authCheck,userController.editUser)
router.post('/patient/add',authCheck,userController.addPatients)
router.patch('/patient/edit',authCheck,userController.editPatients)
router.get('/patient',authCheck,userController.getPatients)
router.get('/patient/:id',authCheck,userController.getByPatientId)

// @ENDPOINT http://localhost:8877/api/user/...
//

module.exports = router;
