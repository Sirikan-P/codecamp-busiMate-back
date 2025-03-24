const express = require("express");
const { authDriver } = require("../middlewares/auth-driver");
const {
  getUsersForSidebarDriver,
  getMessagesDriver,
  sendMessageDriver,
  bookingChatDriver,
} = require("../controllers/driver-controller/message-driver-controller");

const router = express.Router();

router.get("/drivers", authDriver, getUsersForSidebarDriver);
router.get("/driver/:id", authDriver, getMessagesDriver);
router.post("/driver/send/:id", authDriver, sendMessageDriver);
router.get("/booking/chat/:receiverId", authDriver, bookingChatDriver);

module.exports = router;
