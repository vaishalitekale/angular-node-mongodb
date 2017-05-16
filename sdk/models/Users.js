var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/graspu5');
//mongoose.connect('mongodb://graspuuser:noguess21@ds115411.mlab.com:15411/graspu');
//mongoose.connect('');

var bcript = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});

// create our custom method 
UserSchema.methods.toJSON = function() {
    var user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.comparePasswords = function(password, callback) {
    bcript.compare(password, this.password, callback);
};

UserSchema.pre('save', function(next) {
    console.log("I am in UserSchema.pre('save'");

    var user = this;
    // Check if the password has been modified, if not then we wont need to hash it 
    if (!user.isModified('password')) {
        console.log("if(!user.isModified('password'))");
        return next();
    }
    user.role = "ADMIN";

    // here we will be using a library called bcript which provide key based criptography function
    // it uses salt which randomly generate data and a ittration count to protect against some 
    // common attack
    //we will be using npm module bcrypt-node.js 

    // have it ittrate a value of 10
    bcript.genSalt(10, function(err, salt) {
        if (err) {
            console.log("bcript.genSalt err", err);
            return next(err);
        }

        // lets hash the password to encrypt
        //the 3rd parameter is the difference between regular bcript and bcript-node.js 
        // secondary callback for progress 
        bcript.hash(user.password, salt, null, function(err, hashOrIncreptedPassword) {
            if (err) {
                console.log("bcript.hash err", err);
                return next(err);
            }
            // if hash created successfull then we will override the actual user password
            user.password = hashOrIncreptedPassword;
            next();
        });
    });
});

//lets create user moddle and export it 
module.exports = mongoose.model('User', UserSchema);