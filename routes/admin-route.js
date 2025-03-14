const express = require("express")
const router = express.Router()
const adminDashboardController = require("../controllers/admin/admin-dashboard-controller")
const adminUserController = require("../controllers/admin/admin-user-controller")
const { adminAuth } = require("../middlewares/auth-admin")
 

// @ENDPOINT http://localhost:8877/api/admin/...
router.get("/dashboard/userData", adminAuth, adminDashboardController.getUserData)
router.get("/dashboard/paymentData", adminAuth, adminDashboardController.getPaymentData)
router.get("/user/getUserDataAll", adminAuth, adminUserController.getUserDataAll)
router.patch("/user/updateUserData/:id", adminAuth, adminUserController.updateUserData)
router.patch("/user/deleteUser/:id", adminAuth, adminUserController.deleteUser)
router.get("/user/getDriverDataAll", adminAuth, adminUserController.getDriverDataAll)
router.patch("/user/updateDriverData/:id", adminAuth, adminUserController.updateDriverData)
router.patch("/user/deleteDriver/:id", adminAuth, adminUserController.deleteDriver)

module.exports = router