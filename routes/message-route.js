const express = require("express");
const { authUser } = require("../middleware/auth-user");
const {
  getMessages,
  getUsersForSidebar,
} = require("../controllers/message-controller");

const router = express.Router();

router.get("/users", authUser, getUsersForSidebar);
router.get("/:id", authUser, getMessages);

router.post("/send/:id", authUser,sendMessage)

module.exports = router;
