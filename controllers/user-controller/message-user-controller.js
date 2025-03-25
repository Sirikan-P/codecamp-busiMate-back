const prisma = require("../../configs/prisma");
const cloudinary = require("../../configs/cloudinary");

module.exports.getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const userBookings = await prisma.booking.findMany({
      where: {
        patient: {
          userId: loggedInUserId,
        },
      },
      select: {
        id: true,
        driverId: true,
      },
    });

    const driverIds = userBookings.map((booking) => booking.driverId);

    const filteredUsers = await prisma.driver.findMany({
      where: {
        id: {
          in: driverIds,
        },
        role: "driver",
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        profileImageUrl: true,
        gender: true,
        idCard: true,
        carRegNo: true,
        carType: true,
        status: true,
        online: true,
        hasAssist: true,
        hasWheelChair: true,
        role: true,
      },
    });

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getMessagesUser = async (req, res) => {
  try {
    const { id: recipientId, recipientType } = req.params;
    const myId = req.user.id;
    const isUser = req.user.role === "user";

    const userBookings = await prisma.booking.findMany({
      where: {
        OR: [{ patient: { userId: myId } }, { driverId: myId }],
      },
      select: { id: true },
    });
    const bookingIds = userBookings.map((booking) => booking.id);

    const messages = await prisma.message.findMany({
      where: {
        bookingId: { in: bookingIds },
        OR: [
          {
            [isUser ? "senderUserId" : "senderDriverId"]: myId,
            [recipientType === "user" ? "receiverUserId" : "receiverDriverId"]:
              parseInt(recipientId),
          },
          {
            [isUser ? "receiverUserId" : "receiverDriverId"]: myId,
            [recipientType === "user" ? "senderUserId" : "senderDriverId"]:
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
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.sendMessageUser = async (req, res) => {
  try {
    const { text, image, recipientType } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    const isUser = req.user.role === "user";

    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          {
            patient: { userId: isUser ? senderId : parseInt(receiverId) },
            driverId: isUser ? parseInt(receiverId) : senderId,
          },
          {
            patient: { userId: isUser ? parseInt(receiverId) : senderId },
            driverId: isUser ? senderId : parseInt(receiverId),
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
        senderUserId: senderId,
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

module.exports.bookingChatUser = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user.id;

    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { patient: { userId: senderId }, driverId: parseInt(receiverId) },
          { patient: { userId: parseInt(receiverId) }, driverId: senderId },
        ],
        bookingStatus: { not: "COMPLETE" },
      },
      select: { id: true },
    });

    if (!booking) {
      return res.status(404).json({ error: "No active booking found" });
    }

    res.json({ bookingId: booking.id });
  } catch (error) {
    console.error("Error fetching booking ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
