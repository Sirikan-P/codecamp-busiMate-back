const prisma = require("../../configs/prisma")

module.exports.createReview = async (req, res) => {
    try {
      const { rate, message, bookingId } = req.body;
      const userId = req.user.id;
      console.log(req.user, "fffffffffffff");
      const newReview = await prisma.review.create({
        data: {
          rate,
          message,
          bookingId: bookingId,
        },
      });
  
      res.status(201).json(newReview);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };