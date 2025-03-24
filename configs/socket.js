// const  { Server } = require ("socket.io");
// const  http = require ("http");
// const  express = require ("express");
const prisma = require("../configs/prisma.js");
const cloudinary = require("../configs/cloudinary.js");

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: ["http://localhost:5173"] },
// });

const useSocketMap = {};

exports.chatio = (io) => {
  return io.on("connection", (socket) => {
    console.log(
      "A user connected:",
      socket.id,
      "userId:",
      socket.handshake.query.userId
    );

    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
      useSocketMap[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(useSocketMap));
      console.log("Updated useSocketMap on connect:", useSocketMap);
    }

    socket.on("joinChat", (bookingId) => {
      socket.join(bookingId);
      console.log(`User ${userId} joined room ${bookingId}`);
      const clientsInRoom = io.sockets.adapter.rooms.get(bookingId);
      console.log(
        `Clients in room ${bookingId}:`,
        clientsInRoom ? clientsInRoom.size : 0
      );
    });

    socket.on("sendMessage", async (messageData) => {
      try {
        const { senderId, receiverId, text, image, recipientType, role } =
          messageData;
        console.log("Received sendMessage:", messageData);

        const booking = await prisma.booking.findFirst({
          where: {
            OR: [
              {
                patient: {
                  userId:
                    role === "user" ? parseInt(senderId) : parseInt(receiverId),
                },
                driverId:
                  role === "user" ? parseInt(receiverId) : parseInt(senderId),
              },
              {
                patient: {
                  userId:
                    role === "user" ? parseInt(receiverId) : parseInt(senderId),
                },
                driverId:
                  role === "user" ? parseInt(senderId) : parseInt(receiverId),
              },
            ],
            bookingStatus: { not: "COMPLETE" },
          },
          select: { id: true },
        });

        if (!booking) {
          console.log("No active shared booking found for:", {
            senderId,
            receiverId,
          });
          socket.emit("messageError", {
            error: "No active shared booking found",
          });
          return;
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
            ...(role === "driver"
              ? { senderDriverId: parseInt(senderId) }
              : { senderUserId: parseInt(senderId) }),
            ...(recipientType === "driver"
              ? { receiverDriverId: parseInt(receiverId) }
              : { receiverUserId: parseInt(receiverId) }),
            bookingId: booking.id,
          },
        });

        io.to(booking.id).emit("newMessage", newMessage);
        const receiverSocketId = useSocketMap[receiverId];
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
          console.log(
            `Directly emitted to receiver ${receiverId} at socket ${receiverSocketId}`
          );
        }
        console.log(`Emitted newMessage to room ${booking.id}:`, newMessage);

        const clientsInRoom = io.sockets.adapter.rooms.get(booking.id);
        console.log(
          `Clients in room ${booking.id}:`,
          clientsInRoom ? [...clientsInRoom] : "No clients"
        );
      } catch (error) {
        console.error("Error in sendMessage:", error.message, error.stack);
        socket.emit("messageError", {
          error: error.message || "Failed to send message",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      if (userId && useSocketMap[userId] === socket.id) {
        delete useSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(useSocketMap));
        console.log("Updated useSocketMap on disconnect:", useSocketMap);
      }
    });
  });
};
// export { io, app, server };
// export function getReceiverSocketId(userId) {
//   return useSocketMap[userId];
// }