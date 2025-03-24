const jwt = require("jsonwebtoken");

module.exports.authDriver = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized: Invalid header" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token in authDriver:", token_decode); // Add this
    if (token_decode.role !== "driver") {
      console.log("Role mismatch, expected 'driver', got:", token_decode.role); // Add this
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Driver access only" });
    }
    req.driver = {
      id: token_decode.id,
      email: token_decode.email,
      role: token_decode.role,
    };
    next();
  } catch (error) {
    console.log("Error in authDriver:", error.message); // Add this
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
