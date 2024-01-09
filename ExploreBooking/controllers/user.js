// File name: controllers/user.js
// Web App name: explorebooking

//import model and passport  
let User = require('../models/user');
let passport = require('passport');
let crypto = require('crypto');

// User Profile 
  module.exports.userProfile = function(req, res, next) {  
    User.find((err, userProfile) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('userProfile', {
                title: 'Posts', 
                userProfile: userProfile,
                userAboutMe: req.user ? req.user.aboutMe: '',
                userFullname: req.user ? req.user.firstName + " " + req.user.lastName: '',
                userGender: req.user ? req.user.gender: '',
                userJoinedDate: new Date(),
                userNationality: req.user ? req.user.nationality: '',
                userInterest: req.user ? req.user.interest: '',
                userAddress: req.user ? req.user.address: '',
                //Added user items for authentication 
                user: req.user ? req.user.firstName: '',
                userType: req.user ? req.user.userType: ''
            })            
        }
    });
  }

  // Render Login page. 
  module.exports.renderLogin = function(req, res, next) {
    if (!req.user) {
      res.render('login', {
        title: 'Login Form',
        messages: req.flash('error') || req.flash('info'),
        user: req.user ? req.user.firstName: '',
        userType: req.user ? req.user.userType: ''
      });
    } else {
      console.log(req.user);
      return res.redirect('/');
    }
  };

  //Process Login 
  module.exports.processLogin = function(req, res, next) {
    console.log("Process Login");
    passport.authenticate('local', {   
      successRedirect: req.session.url || '/',
      failureRedirect: '/user/login',
      failureFlash: true
    })(req, res, next);
    delete req.session.url;
};

module.exports.renderSignup = function (req, res, next) {
  if (!req.user) {
    res.render('Signup', {
      title: 'Signup Form',
      messages: req.flash('error') || req.flash('info'),
      user: req.user ? req.user.firstName : '',
      userType: req.user ? req.user.userType : ''
    });
  } else {
    console.log(req.user);
    return res.redirect('/');
  }
};

exports.processSignup = function (req, res, next) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    provider: 'local'
  });

  // generate salt and hash password
  user.salt = crypto.randomBytes(16).toString('hex');
  user.password = user.hashPassword(req.body.password);

  user.save((err) => {
    if (err) {
      return next(err);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  });
};

  //Process logout 
  module.exports.logout = function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
      }
      res.redirect('/');
    });
  };
  
   // Edit profile 
   module.exports.editProfile = function(req, res, next) {  
    User.find((err, userProfile) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('pages/edit-profile', {
                title: 'Edit Profile',
                user: req.user ? req.user.firstName: '',
                userType: req.user ? req.user.userType: '',
                userName: req.user ? req.user.username: '',
                description: req.user ? req.user.aboutMe: '',
                interests: req.user ? req.user.interest: ''
                
            })            
        }
    });
  }

  // Update profile controller 
module.exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user;

    user.username = req.body.username;
    user.description = req.body.aboutMe;
    user.interests = req.body.interests;

    // Update user password if provided
    if (req.body.password && req.body.confirmPassword) {
      if (req.body.password !== req.body.confirmPassword) {
        await user.setPassword(''); // Clear the password
        return res.redirect('/edit-profile');
      } else {
        await user.setPassword(req.body.password);
        res.User.setPassword(req.body.password);
      }
    }

    await user.save();
    res.User.updateProfile;
    res.redirect('/user');
  } catch (err) {
    console.error(err);
    return res.redirect('/edit-profile');
  }
};