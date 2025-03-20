const prisma = require("../../configs/prisma")

exports.createFeedbackReport = async (req, res, next) => {
  try {
    res.json({message: "Hello, createAdminReport"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.getAllFeedbackReport = async (req, res, next) => {
  try {
    res.json({message: "Hello, getAllFeedbackReport"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}

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

