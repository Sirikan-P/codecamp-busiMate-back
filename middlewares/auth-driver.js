const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized: Invalid header" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.driver = {
      id: token_decode.id,
      email: token_decode.email,
      role: token_decode.role,
    };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    console.log("Error in authUser middleware:", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};