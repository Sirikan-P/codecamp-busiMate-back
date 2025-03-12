const express = require("express");
const {
  registerUser,
  registerDriver,
  loginUser,
  updateProfile,
  checkAuth,
  loginDriver,
} = require("../controllers/auth-controller");
const { authUser } = require("../middlewares/auth-user");

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/register-driver", registerDriver);
router.post("/login-user", loginUser);
router.post("/login-driver", loginDriver);

router.put("/update-profile", authUser, updateProfile);

router.get("/check", authUser, checkAuth);

module.exports = router;
