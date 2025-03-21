const createError = require("../../middlewares/error");
const prisma = require("../../configs/prisma");

exports.createBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
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
      hospitalId,
    } = req.body;

    const user = await prisma.user.findUnique({ where: { id: +userId } });
    if (!user) return next(createError(404, "User not found"));

    const patient = await prisma.patient.findUnique({
      where: { id: +patientId },
    });
    if (!patient) return next(createError(404, "Patient not found"));

    const driver = await prisma.driver.findUnique({ where: { id: +driverId } });
    if (!driver) return next(createError(404, "Driver not found"));

    const newBooking = await prisma.booking.create({
      data: {
        needWheelChair,
        needAssist,
        appointmentDate,
        bookingStatus,
        paymentStatus,
        appointmentImage,
        specialRequirement,
        totalPrice,
        patientId: +patient.id,
        driverId: +driver.id,
        hospitalId: +hospitalId,
      },
    });
    res.status(201).json(newBooking);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await prisma.patient.findMany({
      where: {
        userId: +userId,
      },
    });
    if (!user) {
      return createError(404, "User not found");
    }

    const bookings = await prisma.booking.findMany({
      where: {
        patientId: +user,
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
      },
    });
    if (!booking) {
      return createError(404, "Booking not found");
    }

    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getBookingForChat = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return next(createError(401, "User not authenticated"));
    }

    const userId = parseInt(req.user.id);
    const driverId = parseInt(req.params.driverId);

    console.log("getBookingForChat - userId:", userId, "driverId:", driverId);

    if (isNaN(userId) || isNaN(driverId)) {
      return next(createError(400, "Invalid userId or driverId"));
    }

    const booking = await prisma.booking.findFirst({
      where: {
        patient: { userId: userId },
        driverId: driverId,
      },
      select: { id: true },
    });

    console.log("Booking found:", booking);

    if (!booking) {
      return next(
        createError(404, "No shared booking found between user and driver")
      );
    }

    res.status(200).json({ bookingId: booking.id });
  } catch (error) {
    console.error("Error in getBookingForChat:", error.message, error.stack);
    next(error);
  }
};
