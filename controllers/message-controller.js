const prisma = require("../models");

module.exports.getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const filteredUsers = await prisma.user.findMany({
      where: {
        id: {
          not: loggedInUserId,
        },
      },
      select: {
        id: true,
        email: true,
      },
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const { id: recipientId, recipientType } = req.params;
    const myId = req.user.id;
    const isUser = req.user.role === "user";

    const messages = await prisma.message.findMany({
      where: {
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

module.exports.sendMessage = async (req, res) => {
  try {
    const { text, image, recipientType } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    const isUser = req.user.role === "user";

    let imageUrl;
    if (image) {
      const uploadResponse = await cloundinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await prisma.message.create({
      data: {
        text,
        image: imageUrl,
        ...(isUser ? { senderUserId: senderId } : { senderDriverId: senderId }),
        ...(recipientType === "user"
          ? { receiverUserId: parseInt(receiverId) }
          : { receiverDriverId: parseInt(receiverId) }),
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
