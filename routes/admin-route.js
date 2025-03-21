const express = require("express")
const router = express.Router()
const adminDashboardController = require("../controllers/admin/admin-dashboard-controller")
const adminUserController = require("../controllers/admin/admin-user-controller")
const adminReportController = require("../controllers/admin/admin-report-controller")
const { adminAuth } = require("../middlewares/auth-admin")
const { authCheck } = require("../middlewares/authCheck")
 

// @ENDPOINT http://localhost:8877/api/admin/...
router.get("/dashboard/bookingDataByDate", adminAuth, adminDashboardController.getBookingDataByDate)
router.get("/dashboard/paymentData", adminAuth, adminDashboardController.getPaymentData)
router.get("/user/getUserDataAll", adminAuth, adminUserController.getUserDataAll)
router.patch("/user/updateUserData/:id", adminAuth, adminUserController.updateUserData)
router.patch("/user/deleteUser/:id", adminAuth, adminUserController.deleteUser)
router.get("/user/getDriverDataAll", adminAuth, adminUserController.getDriverDataAll)
router.get("/user/findDriverByName", adminAuth, adminUserController.findDriverByName)
router.patch("/user/updateDriverData/:id", adminAuth, adminUserController.updateDriverData)
router.patch("/user/deleteDriver/:id", adminAuth, adminUserController.deleteDriver)
router.post("/report/createFeedbackReport",  adminReportController.createFeedbackReport)
router.get("/report/getAllFeedbackReport", adminReportController.getAllFeedbackReport)
router.get("/report/getFeedbackReportById/:id",  adminReportController.getFeedbackReportById)
router.patch("/report/updateFeedbackReportById/:id", adminReportController.updateFeedbackReportById)

module.exports = router