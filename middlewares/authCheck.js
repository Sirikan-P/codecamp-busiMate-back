const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

const authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next(createError(401, "No token provided"));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("authCheck error:", error.message);
    next(createError(401, "Invalid token"));
  }
};

module.exports = { authCheck };
