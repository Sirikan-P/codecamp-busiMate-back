const createError = require("../../middlewares/error")
const prisma  = require("../../configs/prisma")

exports.createBooking = async (req, res, next) => {
  try {
   const  userId = req.user.id

    const { 
        needWheelChair,
        needAssist,
        appointmentDate,
        bookingStatus,
        paymentStatus,   
        appointmentImage,   
        specialRequirement, 
        totalPrice,  
        patientId,          
        driverId,           
        hospitalId 
        } = req.body

        const user = await prisma.user.findUnique({
            where: {
              id: +userId,
            },
          })
        if (!user) {
            return next(createError(404, "User not found"))
          }

        const patient = await prisma.patient.findUnique({
            where: {
              id: +patientId,
            },
          })
          if (!patient) {
            return next(createError(404, "Patient not found"))
          }
        const driver = await prisma.driver.findUnique({
            where: {
              id: +driverId,
            },
          })
          if (!driver) {
            return next(createError(404, "Driver not found"))
          }

    const newBooking = await prisma.booking.create({
        data:{
      needWheelChair : needWheelChair,
      needAssist : needAssist,
      appointmentDate : appointmentDate,
      bookingStatus : bookingStatus,
      paymentStatus :  paymentStatus,   
      appointmentImage : appointmentImage,   
      specialRequirement: specialRequirement, 
      totalPrice : totalPrice,  
      patientId : +patient.id,          
      driverId : +driver.id,           
      hospitalId : +hospitalId
    }
    })
    res.status(201).json(newBooking)
  } catch (error) {
    console.log(error)
    next(error)
  }
}


exports.getBooking = async (req, res, next) => {
  try {
    const  userId  = req.user.id
    const user = await prisma.patient.findMany({
      where: {
        userId: +userId,
      },
    })
      if(!user){
        return createError(404, "User not found")
      }

    const bookings = await prisma.booking.findMany({
        where: {
          patientId: +user,
        },
    })

    res.status(200).json(bookings)
  } catch (error) {
    console.log(error)
    next(error)
  }
}


exports.cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params
    const booking = await prisma.booking.findFirst({
        where:{
            id: bookingId,
        }
    })
    if (!booking) {
      return createError(404, "Booking not found")
    }

    res.status(200).json(booking)
  } catch (error) {
    console.log(error)
    next(error)
  }
}


// Hospital
exports.getHospital = async (req,res,next) =>{
  try {
    const hospital = await prisma.hospital.findMany({
      select:{
        id : true,
        name : true,
        address: true,
        lat: true,
        long: true,

      }
    })
    
    res.status(200).json(hospital)

  } catch (error) {
    next(error)
  }

}

// UserAddress
exports.getUserAddress = async (req,res,next) =>{
  try {
    const userId = req.user.id
    console.log(userId, "userId");
    
    const userAddress = await prisma.userAddress.findMany({
      where : {
        userId : userId
      }
    })
    console.log('userAddress', userAddress)
    res.status(200).json(userAddress)

  } catch (error) {
    
  }
}
