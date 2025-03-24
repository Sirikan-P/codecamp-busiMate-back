const express = require("express");
const router = express.Router();
const adminDashboardController = require("../controllers/admin/admin-dashboard-controller");
const adminUserController = require("../controllers/admin/admin-user-controller");
const { authAdmin } = require("../middlewares/auth-admin");

router.get(
  "/dashboard/userData",
  authAdmin,
  adminDashboardController.getUserData
);
router.get(
  "/dashboard/paymentData",
  authAdmin,
  adminDashboardController.getPaymentData
);
router.get(
  "/user/getUserDataAll",
  authAdmin,
  adminUserController.getUserDataAll
);
router.patch(
  "/user/updateUserData/:id",
  authAdmin,
  adminUserController.updateUserData
);
router.patch("/user/deleteUser/:id", authAdmin, adminUserController.deleteUser);
router.get(
  "/user/getDriverDataAll",
  authAdmin,
  adminUserController.getDriverDataAll
);
router.patch(
  "/user/updateDriverData/:id",
  authAdmin,
  adminUserController.updateDriverData
);
router.patch(
  "/user/deleteDriver/:id",
  authAdmin,
  adminUserController.deleteDriver
);

module.exports = router;
