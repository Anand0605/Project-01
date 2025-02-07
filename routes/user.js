const express = require("express");
const { 
    handleGetAllUsers, 
    handlegetUserById, 
    handleUpdateUserById, 
    handleDeleteUserById, 
    handleCreateNewUser 
} = require('../controllers/user');

const router = express.Router();

// Routes for all users
router.route("/")
    .get(handleGetAllUsers)   // Get all users
    .post(handleCreateNewUser); // Create new user

// Routes for a specific user by ID
router.route("/:Id")
    .get(handlegetUserById)    // Get user by ID
    .patch(handleUpdateUserById)  // Update user by ID
    .delete(handleDeleteUserById); // Delete user by ID

module.exports = router;
