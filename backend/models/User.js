// Mongoose schema and model for users
const mongoose = require("mongoose")

// Define the fields for the User collection
const UserSchema = new mongoose.Schema(
    {
        // required name string
        name: { type: String, required: true },
        // required unique email address
        email: { type: String, required: true, unique: true },
        // required password (in production, store hashes instead of plaintext)
        password: { type: String, required: true },
        // optional phone number
        phone: String,
        isAdmin : {type: Boolean, default: false }
    },
    // Automatically add `createdAt` and `updatedAt` timestamp fields
    { timestamps: true }
);

// Create the model from the schema and export it for use in controllers
const User = mongoose.model("User", UserSchema);

module.exports = User;