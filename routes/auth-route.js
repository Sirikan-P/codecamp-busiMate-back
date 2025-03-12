const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")

// @ENDPOINT http://localhost:8877/api/auth/...
router.post("/auth/register", authController.register)

module.exports = router 