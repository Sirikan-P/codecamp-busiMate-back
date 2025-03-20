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
    const { driverId } = req.params;
    const driver = await prisma.driver.findUnique({
      where: { id: Number(driverId) },
    });

    const review = await prisma.booking.findMany({
      where: { driverId: Number(driverId) },
      include: { reviews: true },
    });

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    const reviews = review.flatMap((item) => item.reviews);

    const rateMapping = { A: 5, B: 4, C: 3, D: 2, E: 1 };

    const results = reviews.map(item => ({
      ...item,
      rate: rateMapping[item.rate] || item.rate
    }));

    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      result: {data:results,driver:driver}
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error });
  }
};


module.exports.getAverageDriverRating = async (req, res) => {
  try {
    const { driverId } = req.params;
    const driver = await prisma.driver.findUnique({
      where: { id: Number(driverId) },
    });

    const review = await prisma.booking.findMany({
      where: { driverId: Number(driverId) },
      include: { reviews: true },
    });

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    const reviews = review.flatMap((item) => item.reviews);

    const rateMapping = { A: 5, B: 4, C: 3, D: 2, E: 1 };

    const results = reviews.map(item => ({
      ...item,
      rate: rateMapping[item.rate] || item.rate
    }));

    const getAverageRate = (reviews) => {
      if (reviews.length === 0) return 0; // ป้องกันหารด้วย 0
      const total = reviews.reduce((sum, item) => sum + item.rate, 0);
      return total / reviews.length;
    };

    const averageRate = getAverageRate(results);
    console.log("Average Rate:", averageRate);

    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      result: averageRate
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error });
  }
};

//http://localhost:8877/api/user/review/driver/1/average


