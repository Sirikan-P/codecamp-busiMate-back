const createError = require("../../middlewares/error")

exports.updateUserData = (req, res, next) => {
  try {
    // console.log(aaa)
    const {id} = req.params
    const {status} = req.body
    res.json({message : "Hello, Update userData", id, status})
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.deleteUser = (req, res, next) => {
  try {
    // console.log(aaa)
    const {id} = req.params
    const {status} = req.body
    res.json({message : "Hello, Delete User", id, status})
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.updateDriverData = (req, res, next) => {
  try {
    // console.log(aaa)
    const {id} = req.params
    const {status} = req.body
    res.json({message : "Hello, Update userData", id, status})
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.deleteDriver = (req, res, next) => {
  try {
    // console.log(aaa)
    const {id} = req.params
    const {status} = req.body
    res.json({message : "Hello, Delete Driver", id, status})
  } catch (error) {
    console.log(error)
    next(error)
  }
}