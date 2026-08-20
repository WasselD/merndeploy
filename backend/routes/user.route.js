// Routes for user-related API endpoints
const express = require("express");
const {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller");
const router = express.Router();


// GET /api/user/all
// Retrieve a list of all users stored in the database.
router.get("/all", getAllUsers);


// PUT /api/user/:id
// Update an existing user by MongoDB `_id`. Request body contains fields to update.
router.put("/:id", updateUser);

// DELETE /api/user/:id
// Delete a user by MongoDB `_id`.
router.delete("/:id", deleteUser);


module.exports = router;