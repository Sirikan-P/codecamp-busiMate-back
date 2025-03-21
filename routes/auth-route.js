const express = require("express");
const {
  registerUser,
  registerDriver,
  loginUser,
  updateProfile,
  checkAuth,
  loginDriver,
  adminLogin,
} = require("../controllers/auth-controller");
const { authUser } = require("../middlewares/auth-user");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/register-driver", registerDriver);
router.post("/login-user", loginUser);
router.post("/login-driver", loginDriver);
router.post("/login-admin", adminLogin);

router.put(
  "/update-userprofile",
  authUser,
  upload.single("profilePic"),
  updateProfile
);

router.get("/check", authUser, checkAuth);

module.exports = router;
