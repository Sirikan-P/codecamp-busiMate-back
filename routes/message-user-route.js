const express = require("express");
const { authUser } = require("../middlewares/auth-user");
const {
  getMessagesUser,
  getUsersForSidebar,
  sendMessageUser,
  bookingChatUser,
} = require("../controllers/user-controller/message-user-controller");

const router = express.Router();

router.get("/users", authUser, getUsersForSidebar); 
router.get("/user/:id", authUser, getMessagesUser); 
router.post("/user/send/:id", authUser, sendMessageUser); 
router.get("/booking/chat/:receiverId", authUser, bookingChatUser);

module.exports = router;
