const prisma = require("../../models");
const cloudinary = require("../../configs/cloudinary");

module.exports.getUsersForSidebarDriver = async (req, res) => {
  try {
    const loggedInDriverId = req.driver.id;
    const driverBookings = await prisma.booking.findMany({
      where: {
        driverId: loggedInDriverId,
      },
      select: {
        id: true,
        patientId: true,
      },
    });

    const patientIds = driverBookings.map((booking) => booking.patientId);

    const filteredUsers = await prisma.user.findMany({
      where: {
        patients: {
          some: {
            id: { in: patientIds },
          },
        },
        role: "user",
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        phoneNumber: true,
        status: true,
        role: true,
      },
    });

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebarDriver:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getMessagesDriver = async (req, res) => {
  try {
    const { id: recipientId, recipientType } = req.params;
    const myId = req.driver.id; // Change to req.driver.id
    const isDriver = req.driver.role === "driver"; // Change to req.driver.role

    const bookings = await prisma.booking.findMany({
      where: {
        [isDriver ? "driverId" : "patient.userId"]: myId,
      },
      select: { id: true },
    });
    const bookingIds = bookings.map((booking) => booking.id);

    if (!bookingIds.length) {
      return res.status(200).json([]);
    }

    const messages = await prisma.message.findMany({
      where: {
        bookingId: { in: bookingIds },
        OR: [
          {
            [isDriver ? "senderDriverId" : "senderUserId"]: myId,
            [recipientType === "driver"
              ? "receiverDriverId"
              : "receiverUserId"]: parseInt(recipientId),
          },
          {
            [isDriver ? "receiverDriverId" : "receiverUserId"]: myId,
            [recipientType === "driver" ? "senderDriverId" : "senderUserId"]:
              parseInt(recipientId),
          },
        ],
      },
      select: {
        id: true,
        senderUserId: true,
        senderDriverId: true,
        receiverUserId: true,
        receiverDriverId: true,
        text: true,
        image: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesDriver: ", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

module.exports.sendMessageDriver = async (req, res) => {
  try {
    const { text, image, recipientType } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    const isDriver = req.user.role === "driver";

    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          {
            patient: { userId: isDriver ? parseInt(receiverId) : senderId },
            driverId: isDriver ? senderId : parseInt(receiverId),
          },
          {
            patient: { userId: isDriver ? senderId : parseInt(receiverId) },
            driverId: isDriver ? parseInt(receiverId) : senderId,
          },
        ],
      },
      select: { id: true },
    });

    if (!booking) {
      return res
        .status(403)
        .json({ error: "No shared booking found between sender and receiver" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await prisma.message.create({
      data: {
        text,
        image: imageUrl,
        ...(isDriver
          ? { senderDriverId: senderId }
          : { senderUserId: senderId }),
        ...(recipientType === "driver"
          ? { receiverDriverId: parseInt(receiverId) }
          : { receiverUserId: parseInt(receiverId) }),
        bookingId: booking.id,
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
