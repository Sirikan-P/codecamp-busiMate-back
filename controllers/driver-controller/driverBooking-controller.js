const prisma = require("../../configs/prisma")
const createError = require("../../utils/createError")

//Driver Accept Booking --------------------------------
//Driver Complete Booking ------------------------------
exports.updateBookingStatus = async (req, res, next) => {
  try {

    const driverId = parseInt(req.user.id);
    const bookingId = parseInt(req.params.id);
    const { bookingStatus  } = req.body;


    // ตรวจสอบว่ามี booking หรือไม่
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });
    if (!booking) {
      return res.status(404).json({ error: "booking not found" });
    }

    // อัปเดตสถานะ 
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        bookingStatus : bookingStatus ,
        driverId : driverId ,
        
      }
    });

    res.json({  success: true ,
      message: `Booking status updated successfully` ,
      result: updatedBooking  });

  } catch (error) {
    next(error)
  }
}

//Get all Booking of me --------------------------------
exports.showAll = async (req, res, next) => {
  try {
    const driverId = parseInt(req.user.id);
    const { status } = req.query;
    //console.log("status ssss ",driverId,status)
    // ค้นหาคำสั่งจองคิวของคนขับ
    const allBooking = await prisma.booking.findMany({
      where: {
        driverId,
        ...(status && { bookingStatus: status })
      },
      include: {
        patient: true,
        driver: true,
        hospital: true,
        UserAddress: true,
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({  success: true ,
                message: `show all driver booking by status` ,
                result: allBooking  });
  } catch (error) {
    next(error)
  }
}

//Get one Booking of me --------------------------------
exports.showDetail = async (req, res, next) => {
  try {
    const driverId = parseInt(req.user.id);
    const bookingId = parseInt(req.params.id);

    // ค้นหาคำสั่งจองคิวของคนขับ พร้อมรายละเอียด
    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, driverId }
    });

    if (!booking) {
      return createError(400, "booking not found")
    }

    res.json({  success: true ,
      message: `show booking by booking ID` ,
      result: booking  });

  } catch (error) {
    next(error)
  }
}
