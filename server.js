require('dotenv').config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const notFound = require("./middlewares/notFound")
const handleErrors = require("./middlewares/error")

// Import Routing
const authRouter = require("./routes/auth-route")

const app = express()

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Routing
app.use("/api", authRouter)

// Not found
app.use(notFound)

// Middleware Error
app.use(handleErrors)


// Start server
const port = process.env.PORT || 8888
app.listen(port, ()=> console.log("Server is running on", port))
