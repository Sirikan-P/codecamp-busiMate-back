require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/error");

// const app = express();

//-----------------------------
// const { createServer} = require('http')
// const { Server } = require('socket.io')
const { app, server, io } = require("./configs/socket");
// const server = createServer(app);
// const io = new Server(server,{
//   cors:{
//     origin: 'http://localhost:5173'
//   }
// });

// Import Routing
const authRouter = require("./routes/auth-route");
const userRouter = require("./routes/user-route");
const driverRouter = require("./routes/driver-route");
const adminRouter = require("./routes/admin-route");
const notiService = require("./utils/notiService");
const messageUserRouter = require("./routes/message-user-route");
const messageDriverRouter = require("./routes/message-driver-route");

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Routing
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/driver", driverRouter);
app.use("/api/admin", adminRouter);
app.use("/api/messages-user", messageUserRouter);
app.use("/api/messages-driver", messageDriverRouter);

// Not found
app.use(notFound);

// Middleware Error
app.use(handleErrors);

//socket -- create event
notiService(io);

// Start server
const port = process.env.PORT || 8877;
server.listen(port, () => console.log("Server is running on", port));
