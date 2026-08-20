// Controller functions for user CRUD operations.
// Each function receives Express `req` and `res` objects and interacts with the User model.
const User = require("../models/User");



// Retrieve and return all users
const getAllUsers = async (req, res) => {
    try {
        const listUser = await User.find();
        res.status(200).json({ msg: "user's list", listUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
const addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID. `req.params.id` is the MongoDB _id and `req.body` contains updates.
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        // findByIdAndUpdate returns the updated document when { new: true } is set
        const userToEdit = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        if (!userToEdit) {
            // If no document was found, return 404 Not Found
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(userToEdit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userToDel = await User.findByIdAndDelete(id);

        if (!userToDel) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", userToDel });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addUser, getAllUsers, updateUser, deleteUser };