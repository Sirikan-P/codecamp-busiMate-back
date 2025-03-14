const createError = require("../../middlewares/error")

exports.getUserData = (req, res, next) => {
  try {
    // console.log(aaa)
    const {type} = req.query
    console.log(type)
    res.json({message : "Hello, Here is userData", type})
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.getPaymentData = (req, res, next) => {
  try {
    // console.log(aaa)
    const {type} = req.query
    res.json({message : "Hello, Here is paymentData", type})
  } catch (error) {
    console.log(error)
    next(error)
  }
}