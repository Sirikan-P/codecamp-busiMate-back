const createError = require("../../middlewares/error")
const prisma  = require("../../configs/prisma")

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

exports.getDriverAll = async (req, res, next) => {
  try {
    const result = await prisma.driver.findMany({
      select: {
        id: true,
        status: true
      },
      orderBy:{
        id: "asc"
      }

    })
    res.json({message: "Hello, getDriverAll", result})
  } catch (error) {
    console.log(error)
    next(error)
  }
}


exports.updateDriverData = async (req, res, next) => {
  try {
    // console.log(aaa)
    const {id} = req.params
    const {status} = req.body
    console.log("id, status  ==== ", id, status)
    const result = await prisma.driver.update({
      where: {id: Number(id)},
      data: {status: status}
    })
    console.log("result ==== ", result)
    res.json({message : "Hello, Update driverData", data: result})
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