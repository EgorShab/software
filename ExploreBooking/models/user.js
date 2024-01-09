// File name: user.js
// Web App name: explorebooking

//Import 
let mongoose = require('mongoose');
let crypto = require('crypto');

//user model 
let UserSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        gender: String,
        nationality: String,
        interest: String,
        address: String,
        aboutMe: String,
        email: {
            type: String,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        userType:{
            type: String,
            default: "normal"
        }, //Added userType for authentication 
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        password: {
            type: String,
            validate: [(password) => {
                return password && password.length > 6;
            }, 'Password should be longer']
        },
        salt: {
            type: String
        },
        provider: {
            type: String,
            required: 'Provider is required'
        },
        providerId: String,
        providerData: {},
        created: {
            type: Date,
            default: Date.now
        }        
    },
    {
        collection: "user"
    }
);

// Function for authentication  
UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

// Function for authentication  
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};


module.exports = mongoose.model("User", UserSchema);