const prisma = require("../../configs/prisma")

module.exports.createFeedbackReport = async (req, res) => {
  try {
    const { type, status, topic, message, image, bookingId, adminId } = req.body;
    const newReport = await prisma.report.create({
      data: {
        type,
        status,
        topic,
        message,
        image,
        bookingId: bookingId,
        adminId: adminId,
      },
    });

    res.status(201).json({
      success: true,
      message: " created successfully",
      data: newReport,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports.getAllFeedbackReport = async (req, res) => {
  try {
    const { id } = req.params; // รับค่า id จาก URL

    const review = await prisma.report.findUnique({
      where: { id: Number(id) }, // แปลง id เป็นตัวเลข
      include: { booking: true }, // JOIN Booking
    });

    if (!report) {
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




exports.getFeedbackReportById = async (req, res, next) => {
  try {
    res.json({message: "Hello, getFeedbackReportById"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.updateFeedbackReportById = async (req, res, next) => {
  try {
    res.json({message: "Hello, updateFeedbackReportById"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}


