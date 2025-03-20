const prisma = require("../../configs/prisma")

module.exports.createReview = async (req, res) => {
    try {
      const { rate, message, bookingId } = req.body;
    //   const userId = req.user.id;
    console.log(req.user);
      const newReview = await prisma.review.create({
        data: {
          rate,
          message,
          bookingId: bookingId,
        },
      });
  
      res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: newReview,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  module.exports.getReviewById = async (req, res) => {
    try {
      const { id } = req.params; // รับค่า id จาก URL
  
      const review = await prisma.review.findUnique({
        where: { id: Number(id) }, // แปลง id เป็นตัวเลข
        include: { booking: true }, // JOIN Booking
      });
  
      if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Review fetched successfully",
        data: review,
      });
  
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  module.exports.getReviewByDriverId = async (req, res) => {
    try {
      const { DriverId } = req.params; // รับค่า id จาก URL
  
      const review = await prisma.review.findUnique({
        where: { id: Number(id) }, // แปลง id เป็นตัวเลข
        include: { booking: true }, // JOIN Booking
      });
  
      if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Review fetched successfully",
        data: review,
      });
  
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };





  
  


  
  