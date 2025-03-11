const createError = require("../middlewares/error")

exports.register = (req, res, next) => {
  try {
    // console.log(aaa)
    res.json("Hello, Register!")
  } catch (error) {
    console.log(error)
    next(error)
  }
}