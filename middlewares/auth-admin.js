const jwt = require("jsonwebtoken");

module.exports.adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized: Invalid header" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (
      token_decode.email !== process.env.ADMIN_EMAIL ||
      token_decode.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Admin Access Only" });
    }
    req.admin = {
      email: token_decode.email,
      role: token_decode.role,
    };
    next();
  } catch (error) {
    console.log("Error in authAdmin middleware:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
