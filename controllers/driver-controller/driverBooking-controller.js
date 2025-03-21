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

    // ค้นหาคำสั่งจองคิวของคนขับ
    const allBooking = await prisma.booking.findMany({
      where: {
        driverId,
        ...(status && { bookingStatus: status })
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

exports.getBookingForChat = async (req, res, next) => {
  try {
    const driverId = req.user.id;
    const userId = parseInt(req.params.userId);

    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { patient: { userId: userId }, driverId: driverId },
          { patient: { userId: driverId }, driverId: userId },
        ],
      },
      select: { id: true },
    });

    if (!booking) {
      return next(createError(404, "No shared booking found between driver and user"));
    }

    res.status(200).json({ bookingId: booking.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};