var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');

/* GET Route for the user display name - READ Operation */
router.get('/user/:id', indexController.displayUser);

/* POST Route for processing the Login page. */
router.post('/login', indexController.processLoginPage);

/* POST Route for processing the Register page. */
router.post('/register', indexController.processRegisterPage);

/* POST Route for processing the Update User page. */
router.post('/updateUser', indexController.processUpdateUserPage);

/* GET to perform Logout */
router.get('/logout', indexController.performLogout);

module.exports = router;