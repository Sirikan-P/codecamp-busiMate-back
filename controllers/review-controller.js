const prisma = require("../configs/prisma")

module.exports.createReview = async (req, res) => {
    try {
      const { rate, message, bookingId, driverId } = req.body;
      const userId = req.user.id;
      const newReview = await prisma.review.create({
        data: {
          userId:userId,
          rate,
          message,
          bookingId: bookingId || null,
          driverId,
        },
      });
  
      res.status(201).json(newReview);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };