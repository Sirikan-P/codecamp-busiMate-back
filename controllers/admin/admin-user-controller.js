const createError = require("../../middlewares/error")
const prisma  = require("../../configs/prisma")

exports.getUserDataAll = async (req, res, next) => {
  try {
    const result = await prisma.user.findMany({
      select: {
        id: true,
        profileImage: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        status: true,
        UserAddress: {
          select: {address: true}
        }
      },
      orderBy:{
        id: "asc"
      }

    })
    res.json({message: "Hello, getUserAll",data: result})
  } catch (error) {
    console.log(error)
    next(error)
  }
}


exports.updateUserData = async (req, res, next) => {
  try {
    // console.log(aaa)
    const {id} = req.params
    const {status} = req.body
    console.log("id, status  ==== ", id, status)
    const result = await prisma.user.update({
      where: {id: Number(id)},
      data: {status: status}
    })
    console.log("result ==== ", result)
    res.json({message : "Hello, Delete(soft) User", data: result})
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    // console.log(aaa)
    const {id} = req.params
    const {status} = req.body
    console.log("id, status  ==== ", id, status)
    const result = await prisma.user.update({
      where: {id: Number(id)},
      data: {status: status}
    })
    console.log("result ==== ", result)
    res.json({message : "Hello, Delete(soft) User", data: result})
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.getDriverDataAll = async (req, res, next) => {
  try {
    const result = await prisma.driver.findMany({
      select: {
        id: true,
        profileImageUrl: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        status: true,
        DriverAddress: {
          select: {address: true}
        }
      },
      orderBy:{
        id: "asc"
      }

    })
    res.json({message: "Hello, getDriverAll", data: result})
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
    console.log(req.body)
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

exports.deleteDriver = async (req, res, next) => {
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
    res.json({message : "Hello, Delete(soft) Driver", data: result})
  } catch (error) {
    console.log(error)
    next(error)
  }
}