const express = require("express");
const { createReview } = require("../controllers/review-controller");
const { authUser } = require("../middlewares/auth-user");
const router = express.Router();


module.exports = router;
