const express = require("express");
const { authUser } = require("../middlewares/auth-user");
const {
  getMessagesUser,
  getUsersForSidebar,
  sendMessageUser,
} = require("../controllers/user-controller/message-user-controller");

const router = express.Router();

// User-specific routes (mounted at /api/messages-user)
router.get("/users", authUser, getUsersForSidebar); // /api/messages-user/users
router.get("/user/:id", authUser, getMessagesUser); // /api/messages-user/user/:id
router.post("/user/send/:id", authUser, sendMessageUser); // /api/messages-user/user/send/:id

module.exports = router;
