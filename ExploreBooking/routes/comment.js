// File name: routes/comment.js
// Web App name: explorebooking

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

// Function for authentication   
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(req.isAuthenticated()){
        //if user is logged in, go to next function
        next();
    }else{
        //if user is not loggged in, copy the originalUrl to the session
        req.session.url = req.originalUrl;
        return res.redirect('/user/login');
    }
    

}

router.post('/add', commentController.createComment);



module.exports = router;
