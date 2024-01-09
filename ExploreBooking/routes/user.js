// File name: routes/user.js
// Web App name: explorebooking

const express = require('express');
const router = express.Router();
let userController = require('../controllers/user');

// Route for Edit Profile
router.get('/edit-profile', userController.editProfile);
router.post('/edit-profile', userController.updateProfile);

// Route for displaying user profile
router.get('/', userController.userProfile);

// Routes for login
router.get('/login', userController.renderLogin);
router.post('/login', userController.processLogin);

// Routes for Signup
router.get('/signup', userController.renderSignup);
router.post('/signup', userController.processSignup);

// Route for logout
router.get('/logout', userController.logout);

module.exports = router;