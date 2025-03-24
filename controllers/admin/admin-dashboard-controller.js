const createError = require("../../utils/createError")
const prisma = require("../../configs/prisma")

exports.getBookingDataByDate =  async(req, res, next) => {
  try {
    // console.log(aaa)
    const {date} = req.query
    console.log(date)
    if(!date){
      createError(400, "date is required")
    }
    const bookingDataByDate = await prisma.booking.findMany({
      where: {
        appointmentDate: date,
      },
      select: {
        id: true,
        bookingStatus: true,
        hospital: {
          select:{
            name: true,
            address: true,
          }
        },
        driver: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
            profileImageUrl: true,
            carRegNo: true,
          }
        },
        patient: {
          select: {
              firstName: true,
              lastName: true,
              phoneNumber: true,
              profileImage: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  profileImage: true,
                  phoneNumber: true
                }
              }
          }
        }
      }
    })
    res.json({message : "Hello, getBookingDataByDate successfully", data: bookingDataByDate})
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