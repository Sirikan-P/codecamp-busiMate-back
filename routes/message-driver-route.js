const express = require("express");
const { authDriver } = require("../middlewares/auth-driver");
const {
  getUsersForSidebarDriver,
  getMessagesDriver,
  sendMessageDriver,
} = require("../controllers/driver-controller/message-driver-controller");

const router = express.Router();

router.get("/drivers", authDriver, getUsersForSidebarDriver);
router.get("/driver/:id", authDriver, getMessagesDriver);
router.post("/driver/send/:id", authDriver, sendMessageDriver);

module.exports = router;