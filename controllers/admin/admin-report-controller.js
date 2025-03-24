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
    
    const report = await prisma.report.findMany();
    res.status(200).json({
      success: true,
      data: report,
    });

    if (!report) {
      return res.status(404).json({ success: false, message: "Feedback Not Found" });
    }

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getFeedbackReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await prisma.report.findUnique({
      where: { id: parseInt(id) },
    });

    if (!report) {
      return res.status(404).json({ success: false, message: "Feedback report not found" });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.updateFeedbackReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, status, topic, message, image, bookingId, adminId } = req.body;

    const updatedReport = await prisma.report.update({
      where: { id: parseInt(id) },
      data: { 
        type, 
        status, 
        topic, 
        message, 
        image, 
        bookingId, adminId },
    });

    res.status(200).json({
      success: true,
      message: "Feedback report updated successfully",
      data: updatedReport,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



// exports.getFeedbackReportById = async (req, res, next) => {
//   try {
//     res.json({message: "Hello, getFeedbackReportById"})
//   } catch (error) {
//     console.log(error)
//     next(error)
//   }
// }

// exports.updateFeedbackReportById = async (req, res, next) => {
//   try {
//     res.json({message: "Hello, updateFeedbackReportById"})
//   } catch (error) {
//     console.log(error)
//     next(error)
//   }
// }


