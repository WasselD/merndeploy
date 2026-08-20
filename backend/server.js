// Entry point for the Express application.
// Sets up middleware, connects to the database, and mounts routes.
const express = require("express")
const cors = require("cors")

// Load environment variables from a .env file into process.env
require("dotenv").config()

// Optionally configure DNS servers (this project sets Google DNS as example)
const dns = require("dns")
dns.setServers(['8.8.8.8', '8.8.4.4'])

const app = express()


// Built-in middleware to parse JSON request bodies
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Connect to MongoDB before handling requests
const connectDB = require("./config/connectDB")
connectDB()

app.use("/api/auth" , require("./routes/auth.route"))


// Start server on configured PORT or default 1500
const PORT = process.env.PORT || 1500

app.listen(PORT, (err) => {
    if (err) {
        console.log("fail to connect", err)
        return
    }

    console.log(`Server is running on port ${PORT}`)
})