const mongoose = require("mongoose")

// Connect to MongoDB using Mongoose. The connection URI is read from `process.env.MONGO_URI`.
// If the connection fails the process exits with code 1 so the app does not run without DB.
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		console.log("MongoDB connected")
	} catch (error) {
		console.log("MongoDB connection failed", error)
		// Exit the process - a running API without a DB is likely to fail.
		process.exit(1)
	}
}

module.exports = connectDB
