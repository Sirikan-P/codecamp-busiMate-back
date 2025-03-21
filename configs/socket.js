import { Server } from "socket.io";
import http from "http";
import express from "express";
import prisma from "../configs/prisma.js";
import cloudinary from "../configs/cloudinary.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: ["http://localhost:5173"] },
});

const useSocketMap = {};

io.on("connection", (socket) => {
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
    console.log(
      `Recieve message from event 'sendMessage' in chatId: ${messageData.senderId}`
    );
    try {
      const { senderId, receiverId, text, image, recipientType, role } =
        messageData;
      console.log("Received sendMessage:", messageData);

      const booking = await prisma.booking.findFirst({
        where: {
          OR: [
            {
              patient: { userId: role === "user" ? senderId : receiverId },
              driverId: role === "user" ? receiverId : senderId,
            },
            {
              patient: { userId: role === "user" ? receiverId : senderId },
              driverId: role === "user" ? senderId : receiverId,
            },
          ],
        },
        select: { id: true },
      });

      if (!booking) {
        console.log("No shared booking found for:", { senderId, receiverId });
        socket.emit("messageError", { error: "No shared booking found" });
        return;
      }

      let imageUrl;
      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      console.log("Before insert new message");
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

      console.log("After insert message");

      // Emit to the booking room instead of just the receiver's socket ID
      io.to(booking.id).emit("newMessage", newMessage);
      console.log(`Emitted newMessage to room ${booking.id}:`, newMessage);
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

export { io, app, server };
export function getReceiverSocketId(userId) {
  return useSocketMap[userId];
}
