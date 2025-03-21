require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/error");

// Import Routing
const authRouter = require("./routes/auth-route");
const userRouter = require("./routes/user-route");
const driverRouter = require("./routes/driver-route");
const adminRouter = require("./routes/admin-route");
const messageUserRouter = require("./routes/message-user-route");
const messageDriverRouter = require("./routes/message-driver-route");
const { app, server } = require("./configs/socket");

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

// Start server
const port = process.env.PORT || 8877;
server.listen(port, () => console.log("Server is running on", port));
