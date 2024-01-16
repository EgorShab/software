
const passport = require('passport');
//enable jwt
const jwt = require("jsonwebtoken");
const DB = require("../config/db");


//create the User model instance
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayUser = (req, res, next) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if (!err) return res.json(user.displayName);
        console.log(err);
        res.end(err);
    });
};

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local',
    (err,user,info) => {
        //server err?
        if(err) return next(err);
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage','Autherntication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if (err) {
              return next(err);
            }
            const payload = {
              id: user._id,
              displayName: user.displayName,
              username: user.username,
              email: user.email,
            };
            const authToken = jwt.sign(payload, DB.Secret, {
              expiresIn: 604800, //1 week
            });
      
            res.json({
              success: true,
              msg: "user Logged in successfully",
              user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email,
              },
              token: authToken,
            });
          });
    })(req,res,next);
}

module.exports.processRegisterPage = (req,res,next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name === "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Register Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            res.json({ success: false, msg: "Error: Inserting New User" });
        }
        else
        {
            //if no error exists, then registration is successful
            res.json({ success: true, msg: "User registered successfully!" });
        }
    });
}

module.exports.processUpdateUserPage = (req,res,next) => {
    let updateUser = new User({
        _id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName,
    });

    User.updateOne({_id: updateUser._id }, updateUser, err => {
        if(err)
        {
            console.log("Error: Update Existing User");
            res.json({ success: false, msg: err });
        }
        else
        {
            //if no error exists, then registration is successful
            res.json({ success: true, msg: "User updated successfully!" });
        }
    });
}

module.exports.performLogout = (req,res,next)=>{
    req.logout(err => {
        if (err) return next(err);
    });
    res.json({ success: true, msg: "User log out successfully!"});
}