const express = require("express");
const router = express.Router();

//import controller
const driverController = require("../controllers/driver-controller/driver-controller");
const driverBookingController = require("../controllers/driver-controller/driverBooking-controller");
const driverWalletController = require("../controllers/driver-controller/driverWallet-controller");

//import validator

//import middleware
const { authCheck } = require("../middlewares/authCheck")
const upload = require("../middlewares/upload")

// @ENDPOINT http://localhost:8877/api/driver/...
//my profile -------
router.get('/me', authCheck, driverController.currentDriver ) //authen for pages : verify token
router.patch('/me',authCheck, upload.single('profileImageUrl'),driverController.updateProfile)
//my address -------
router.post('/address',authCheck, driverController.addDriverAddress)
router.patch('/address',authCheck, driverController.updateDriverAddress)
router.delete('/address/:id',authCheck, driverController.deleteDriverAddress)

//my booking id -------
router.get("/booking/:id", checkAuth, driverBookingController.showDetail);
router.get("/booking", checkAuth, driverBookingController.showAll);
router.patch(
  "/booking/:id",
  checkAuth,
  driverBookingController.updateBookingStatus
);
// booking for chat
router.get(
  "/booking/chat/:userId",
  checkAuth,
  driverBookingController.getBookingForChat
);

//my wallet -------
router.post("/wallet/income", checkAuth, driverWalletController.income);
router.post("/wallet/outcome", checkAuth, driverWalletController.outcome);
router.get("/wallet", checkAuth, driverWalletController.getDriverWalletDetails);

module.exports = router;
