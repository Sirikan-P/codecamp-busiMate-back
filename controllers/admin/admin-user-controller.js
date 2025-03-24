const createError = require("../../middlewares/error");
const prisma = require("../../configs/prisma");
const { PaymentStatus } = require("@prisma/client");

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
          select: { address: true },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    res.json({ message: "Hello, getUserAll", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateUserData = async (req, res, next) => {
  try {
    // console.log(aaa)
    const { id } = req.params;
    const { status } = req.body;
    console.log("id, status  ==== ", id, status);
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: { status: status },
    });
    console.log("result ==== ", result);
    res.json({ message: "Hello, Delete(soft) User", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    // console.log(aaa)
    const { id } = req.params;
    const { status } = req.body;
    console.log("id, status  ==== ", id, status);
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: { status: status },
    });
    console.log("result ==== ", result);
    res.json({ message: "Hello, Delete(soft) User", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

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
        online: true,
        DriverAddress: {
          select: { address: true },
        },
        bookings: {
          select: { bookingStatus: true },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    res.json({ message: "Hello, getDriverAll", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.findDriverByName = async (req, res, next) => {
  const {name} = req.query;
  console.log("searchTerm ==== ", name);
  try {
    const result = await prisma.driver.findMany({
      where: {
        OR: [
          { firstName: { contains: name.toLowerCase() } },
          { lastName: { contains: name.toLowerCase() } },
        ],
      },
    });
    console.log("searchResult ==== ", result);
    res.json({ message: "Hello, Find DriverByName", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateDriverData = async (req, res, next) => {
  try {
    // console.log(aaa)
    const { id } = req.params;
    const { status } = req.body;
    console.log(req.body);
    console.log("id, status  ==== ", id, status);
    const result = await prisma.driver.update({
      where: { id: Number(id) },
      data: { status: status },
    });
    console.log("result ==== ", result);
    res.json({ message: "Hello, Update driverData", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteDriver = async (req, res, next) => {
  try {
    // console.log(aaa)
    const { id } = req.params;
    const { status } = req.body;
    console.log("id, status  ==== ", id, status);
    const result = await prisma.driver.update({
      where: { id: Number(id) },
      data: { status: status },
    });
    console.log("result ==== ", result);
    res.json({ message: "Hello, Delete(soft) Driver", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPatientDataAll = async (req, res, next) => {
  try {
    const result = await prisma.patient.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        age: true,
        gender: true,
        profileImage: true,
        phoneNumber: true,
        healthCondition: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            phoneNumber: true,
            status: true,
            createdAt: true,
            UserAddress: {
              select: {
                id: true,
                address: true
              }
            }
          }
        },
        bookings: {
          select: {
            id: true,
            bookingStatus: true,
            paymentStatus: true,
            totalPrice: true,
            reviews: {
              select: {
                id: true,
                rate: true,
                message: true,
              }
            },
            reports: {
              select: {
                id: true,
                type: true,
                status: true,
              }
            }
          }
        }
      },
      orderBy: {
        id: "asc",
      },
    });
    res.json({ message: "Hello, getPatientDataAll", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.findPatientByName = async (req, res, next) => {
  const {name} = req.query;
  console.log("searchTerm ==== ", name);
  try {
    const result = await prisma.patient.findMany({
      where: {
        OR: [
          { firstName: { contains: name.toLowerCase() } },
          { lastName: { contains: name.toLowerCase() } },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        age: true,
        gender: true,
        profileImage: true,
        phoneNumber: true,
        healthCondition: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            phoneNumber: true,
            status: true,
            createdAt: true,
            UserAddress: {
              select: {
                id: true,
                address: true
              }
            }
          }
        },
        bookings: {
          select: {
            id: true,
            bookingStatus: true,
            paymentStatus: true,
            totalPrice: true,
            reviews: {
              select: {
                id: true,
                rate: true,
                message: true,
              }
            },
            reports: {
              select: {
                id: true,
                type: true,
                status: true,
              }
            }
          }
        }
      },
      orderBy: {
        id: "asc",
      },
    });
    console.log("searchResult ==== ", result);
    res.json({ message: "Hello, Find PatientByName", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};