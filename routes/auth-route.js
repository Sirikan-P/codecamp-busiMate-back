const express = require("express");
const {
  registerUser,
  registerDriver,
  loginUser,
  updateProfile,
  loginDriver,
  adminLogin,
  checkAdminAuth,
  checkUserAuth,
  checkDriverAuth,
  updateDriverProfile,
} = require("../controllers/auth-controller");
const { authUser } = require("../middlewares/auth-user");
const { authAdmin } = require("../middlewares/auth-admin");
const { authDriver } = require("../middlewares/auth-driver");
const upload = require("../middlewares/upload");

const router = express.Router();

// Public Routes
router.post("/register-user", registerUser);
router.post("/register-driver", registerDriver);
router.post("/login-user", loginUser);
router.post("/login-driver", loginDriver);
router.post("/login-admin", adminLogin);

// Protected Routes
router.put(
  "/update-userprofile",
  authUser,
  upload.single("profilePic"),
  updateProfile
);
router.put(
  "/update-driverprofile",
  authDriver,
  upload.single("profilePic"),
  updateDriverProfile
);

// Auth Check Routes
router.get("/auth/check/user", authUser, checkUserAuth);
router.get("/auth/check/driver", authDriver, checkDriverAuth);
router.get("/auth/check/admin", authAdmin, checkAdminAuth);

module.exports = router;
