const express = require("express")
const router = express.Router()
const adminDashboardController = require("../controllers/admin/admin-dashboard-controller")
const adminUserController = require("../controllers/admin/admin-user-controller")

// @ENDPOINT http://localhost:8877/api/admin/...
router.get("/dashboard/userData", adminDashboardController.getUserData)
router.get("/dashboard/paymentData", adminDashboardController.getPaymentData)
router.patch("/user/updateUserData/:id", adminUserController.updateUserData)
router.patch("/user/deleteUser/:id", adminUserController.deleteUser)
router.patch("/user/updateDriverData/:id", adminUserController.updateDriverData)
router.patch("/user/deleteDriver/:id", adminUserController.deleteDriver)

module.exports = router