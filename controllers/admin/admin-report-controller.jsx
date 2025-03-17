const prisma = require("../../configs/prisma")

exports.createAdminReport = async (req, res, next) => {
  try {
    res.json({message: "Hello, createAdminReport"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}