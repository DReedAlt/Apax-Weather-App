var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    Schema = require('mongoose').Schema,
    userSchema = new Schema({
        email: String,
        password: String,
        username: String
    });

userSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, cb)
}

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
    
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
    
            user.password = hash;
            next();
        });
    });
});

module.exports = userSchema;