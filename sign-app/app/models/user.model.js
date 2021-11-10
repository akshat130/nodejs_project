const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const UserSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Mobile: String,
    Email: String,
    Password: String,
}, {
    timestamps: true
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('Password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.Password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.Password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('user', UserSchema);