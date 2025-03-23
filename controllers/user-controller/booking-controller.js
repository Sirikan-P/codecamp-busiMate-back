const createError = require("../../middlewares/error");
const prisma = require("../../configs/prisma");
const cloudinary = require("../../configs/cloudinary");
const fs = require("fs");
const multer = require("multer");
const { log } = require("console");
const { create } = require("domain");


const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (angle) => (Math.PI / 180) * angle;
  const R = 6371; // รัศมีของโลก (กม.)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

exports.createBooking = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const img = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
      folder: "BusiMate",
    });

    const userId = req.user.id;
    const {
      needWheelChair,
      needAssist,
      appointmentDate,
      specialRequirement,
      patientId,
      hospitalId,
      userAddressId,
      CarType,
    } = req.body;

    const user = await prisma.user.findUnique({ where: { id: +userId } });
    if (!user) return next(createError(404, "User not found"));

    const patient = await prisma.patient.findUnique({
      where: { id: +patientId } });
    if (!patient) return next(createError(404, "Patient not found"));

    const hospitalAddressId = JSON.parse(hospitalId);
    const userBookingAddressId = JSON.parse(userAddressId);

    // ดึงพิกัด userAddress
    const userAddress = await prisma.userAddress.findFirst({
      where: { id: userAddressId?.id },
      select: { lat: true, long: true },
    });


    if (!userAddress) return next(createError(404, "User address not found"));

    //Chack Available driver
    const driverBooked = await prisma.booking.findMany({
      where: {
        appointmentDate: appointmentDate,
        driverId: {
          not: null,
        }
      },
      select: {
        driverId: true,
      },
    });
    
console.log(driverBooked);

    // ดึงไดรเวอร์ทั้งหมดพร้อมพิกัด
    const drivers = await prisma.driver.findMany({
      where: {
        id: {
          notIn: driverBooked.map(booking => booking.driverId)
        },
        status: "ACTIVE",
        online: "ONLINE",
        DriverAddress: {
          some: { // ใช้ `some` เพราะเราต้องการตรวจสอบอย่างน้อย 1 ที่มีพิกัด
            lat: { not: null },
            long: { not: null },
            status : "USE"
          },
        },
      },
      select: {
        id: true,
        DriverAddress: {
          select: {
            lat: true,
            long: true,
          },
        },
      },
  });
    
    console.log("drivers",drivers);

   // กรองไดรเวอร์ที่อยู่ภายในรัศมี 10 กิโลเมตรจาก userAddress
   const nearbyDrivers = drivers.filter((driver) => {
    if (!driver.DriverAddress || driver.DriverAddress.length === 0) return false;
    
    const driverAddress = driver.DriverAddress[0]; // สมมติว่า DriverAddress มี 1 ตัว
    const distance = haversine(
      userAddress.lat,
      userAddress.long,
      driverAddress.lat,
      driverAddress.long
    );

    return distance <= 10; // กรองเฉพาะไดรเวอร์ที่อยู่ในระยะ 10 กม.
  });

  if (nearbyDrivers.length === 0) {
    return res.status(400).json({ error: "No available drivers within 10km" });
  }

  // สุ่มเลือก driverId ที่อยู่ใกล้ที่สุด
  const selectedDriver = nearbyDrivers[Math.floor(Math.random() * nearbyDrivers.length)];
console.log(selectedDriver,"selectedDriver");
  // สร้าง booking

  const driverAddress = await prisma.driverAddress.findFirst({
    where: {
      driverId: +selectedDriver.id,
      status: "USE",
    },
    select: {
      id: true,
    },
  });
  console.log(driverAddress,"driverAddress");

  const newBooking = await prisma.booking.create({
    data: {
      needWheelChair,
      needAssist,
      appointmentDate,
      appointmentImage: img.url,
      specialRequirement,
      patientId: +patient.id,
      hospitalId: +hospitalAddressId.id,
      CarType,
      userAddressId: +userBookingAddressId.id,
      totalPrice: 3000,
      driverId: +selectedDriver.id,// ใช้ driverId ที่เลือก
      driverAddressId: driverAddress.id,
    },
include: {
      patient: true,
      driver: {
        omit: {
          password: true,
        }
      },
      hospital: true,
    },
  });
  console.log(newBooking,"newBooking");


    res.status(201).json(newBooking);
  } catch (error) {
    console.log(error);
    next(error);
  }
};




// create Booking
// exports.createBooking = async (req, res, next) => {
//   try {
//     // RECIVES IMAGE
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }
//     const img = await cloudinary.uploader.upload(req.file.path, {
//       public_id: `${Date.now()}`,
//       resource_type: "auto",
//       folder: "BusiMate",
//     });

//     const userId = req.user.id;
//     const {
//       needWheelChair,
//       needAssist,
//       appointmentDate,
//       specialRequirement,
//       patientId,
//       hospitalId,
//       userAddressId,
//       CarType,
//     } = req.body;

//     console.log(hospitalId);
//     console.log(userAddressId);

//     const user = await prisma.user.findUnique({ where: { id: +userId } });
//     if (!user) return next(createError(404, "User not found"));

//     const patient = await prisma.patient.findUnique({
//       where: { id: +patientId },
//     });

//     if (!patient) return next(createError(404, "Patient not found"));

//     const hospitalAddressId = JSON.parse(hospitalId);
//     const userBookingAddressId = JSON.parse(userAddressId);

//     const newBooking = await prisma.booking.create({
//       data: {
//         needWheelChair,
//         needAssist,
//         appointmentDate,
//         appointmentImage: img.url, // ใช้ URL จาก Cloudinary
//         specialRequirement,
//         patientId: +patient.id,
//         hospitalId: +hospitalAddressId.id,
//         CarType,
//         userAddressId: +userBookingAddressId.id,
//         totalPrice: 3000,
//       },
//     });

//     res.status(201).json(newBooking);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// get all booking
exports.getBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const pateintOfUser = await prisma.patient.findMany({
      where: {
        userId: +userId,
      },
    });
    const patientIds = pateintOfUser.map((patient) => patient.id);

    const bookings = await prisma.booking.findMany({
      where: {
        patientId: {
          in: patientIds,
        },
      },
      include: {        
        patient: true,
        driver: true,
        hospital: true,
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// GetOneBooking(with bookingID) after createbooking
exports.getOneBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return next(createError(404, "User not found"));
    }
    const { bookingId } = req.params;
    const oneBooking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
      }
    });
    if (!oneBooking) {
      return next(createError(404, "Booking not found"));
    }
    res.status(200).json(oneBooking);
    // res.staus(200).json(oneBooking);
  } catch (error) {
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

// finrdriver
exports.findDriver = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return createError(404, "User not found");
    }
    const { needWheelChair, needAssist, appointmentDate, CarType } = req.body;

    console.log(req.body);

    const Assint = needAssist === "NEED" ? "HAVE" : "NOHAVE";
    const WheelChair = needWheelChair === "NEED" ? "HAVE" : "NOHAVE";

    // if(driverId){
    const driverBooked = await prisma.booking.findMany({
      where: {
        appointmentDate: appointmentDate,
      },
      select: {
        driverId: true,
      },
    });
    //   console.log(driverBooked);
    // }

    // แปลงให้เป็นอาร์เรย์ของ driverId และกรองค่า null ออก
    const driverIds = driverBooked
      .map((booking) => booking.driverId)
      .filter((id) => id !== null);

    // ตรวจสอบกรณีที่ไม่มี driver ที่ถูกจอง
    const whereCondition = {
      status: "ACTIVE",
      online: "ONLINE",
      CarType: CarType,
      OR: [
        {
          hasAssist: "HAVE", // กรณีที่ต้องการ driver ที่มี assist
          hasWheelChair: "HAVE", // กรณีที่ต้องการ driver ที่มี wheelchair
        },
        {
          hasAssist: "NOHAVE", // หรือกรณีที่มี assist ไม่จำเป็น
          hasWheelChair: "NOHAVE", // หรือกรณีที่มี wheelchair ไม่จำเป็น
        },
      ],
    };

    if (driverIds.length > 0) {
      whereCondition.id = { notIn: driverIds }; // ใส่เฉพาะถ้ามี driverIds
    }

    const availableDrivers = await prisma.driver.findFirst({
      where: whereCondition,
      omit: {
        password: true,
      },
    });
    res.status(200).json(availableDrivers);
  } catch (error) {
    next(error);
  }
};

//findNewdriver
exports.findNewDriver = async (req, res, next) => {
  try {
    const { needWheelChair, needAssist, appointmentDate, cartype, driverId } =
      req.body;

    const newDriver = await prisma.driver.findFirst({
      where: {
        id: { notIn: [driverId] },
        status: "ACTIVE",
        online: "ONLINE",
        carType: cartype,
        OR: [
          {
            hasAssist: "HAVE", // กรณีที่ต้องการ driver ที่มี assist
            hasWheelChair: "HAVE", // กรณีที่ต้องการ driver ที่มี wheelchair
          },
          {
            hasAssist: "NOHAVE", // หรือกรณีที่มี assist ไม่จำเป็น
            hasWheelChair: "NOHAVE", // หรือกรณีที่มี wheelchair ไม่จำเป็น
          },
        ],
      },
      select: {
        id: true,
      },
    });
    console.log("newDriver", newDriver);


    res.status(200).json(newDriver);
  } catch (error) {
    next(error);
  }
};

//uodateNewdriver
exports.UpdateNewDriver = async (req, res, next) => {
  try {
    const { id, driverId } = req.body;
    console.log("driverId",driverId);

    const driverData = await prisma.driver.findUnique({
      where: {
        id: +driverId,
      },
      omit: {
        password: true,
      },
    });

    const updateDriverInBooking = await prisma.booking.update({
      where:{
        id : id
      },data:{
        driverId : +driverId,
      }
    }) 

    const Booking = await prisma.booking.findFirst({
      where: {
        id : id
      },include: {
        patient: true,
        driver: true,
        hospital: true,
      }
    })

    console.log(driverId,"driverId");

    res.status(200).json(Booking);
  } catch (error) {
    next(error)
  }
};

// Hospital
exports.getHospital = async (req, res, next) => {
  try {
    const hospital = await prisma.hospital.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        lat: true,
        long: true,
      },
    });

    res.status(200).json(hospital);
  } catch (error) {
    next(error);
  }
};

// UserAddress
exports.getUserAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId, "userId");

    const userAddress = await prisma.userAddress.findMany({
      where: {
        userId: userId,
      },
    });
    console.log("userAddress", userAddress);
    res.status(200).json(userAddress);
  } catch (error) {}
};
