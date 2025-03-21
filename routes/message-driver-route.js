const express = require("express");
const { authUser } = require("../middlewares/auth-user");
const {
  getUsersForSidebarDriver,
  getMessagesDriver,
  sendMessageDriver,
} = require("../controllers/driver-controller/message-driver-controller");

const router = express.Router();

// Driver-specific routes (mounted at /api/messages-driver)
router.get("/drivers", authUser, getUsersForSidebarDriver); // /api/messages-driver/drivers
router.get("/driver/:id", authUser, getMessagesDriver); // /api/messages-driver/driver/:id
router.post("/driver/send/:id", authUser, sendMessageDriver); // /api/messages-driver/driver/send/:id

module.exports = router;
