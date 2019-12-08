
const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// JWT Secret
const jwtSecret = "5nDAknvCTc1vngWc1SJMqyliw2e8UHOycRgYyLJi";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    //return the document except the password and sessions which should never be avaled over http
    return _.omit(userObject, ['password', 'sessions']);
}

UserSchema.methods.generateAccessToken = function() {
    const user = this;
    return new Promise((resolve, reject) => {
        //Create the JWT and return it
        jwt.sign({ _id: user._id.toHexString()}, jwtSecret, { expiresIn: "15m"}, (err, token) => {
            if (!err) {
                resolve(token);
            } else {
                //An error occurred
                reject();
            }
        });
    });
}

/** INSTANCE METHODS */
UserSchema.methods.generateRefreshAuthToken = function() {
    return new Promise((resolve, reject) => {
        //Random 64byte HEX
        crypto.randomBytes(64, (err, buff) => {
            if (!err) {
                //no error
                let token = buff.toString('hex');
                return resolve(token);
            }
        });
    });
}

UserSchema.methods.createSession = function() {
    let user = this;
    return user.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken) => {
        //saved to db
        //return refresh token
        return refreshToken;
    }).catch((e) => {
        return Promise.reject('Failed to save session to database.\n' + e);
    })
}

/** MODEL METHODS (Static) */
UserSchema.statics.getJWTSecret = () => {
    return jwtSecret;
}

UserSchema.statics.findByIdAndToken = function(_id, token) {
    const User = this;
    return User.findOne({
        _id,
        'sessions.token': token
    });
}

UserSchema.statics.findByCredentials = function(email, password) {
    console.log('Authenticating user: ' + email);
    let user = this;
    return user.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        } else {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) resolve(user);
                    else {
                        reject();
                    }
                });
            });
        }
    });
}

UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if (expiresAt > secondsSinceEpoch) {
        return false; //Not expired
    } else {
        return true; //Expired
    }
}

/** MIDDLEWARE */
UserSchema.pre('save', function(next) {
    let user = this;
    let costFactor = 10;
    if (user.isModified('password')) {
        //if password field has been edited then...
        //Generate SALT and hash password, and then replace the
        //password value with the new hash
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }
})

/** HELPER METHODS */
let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10"; //10 days from now
    let secondsUntilExpire = ((daysUntilExpire * 24) *60) *60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}

let saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();
        user.sessions.push({'token': refreshToken, expiresAt});

        user.save().then(() => {
            //Session saved successfully
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        });
    });
}

const User = mongoose.model('User', UserSchema);

module.exports = {User}