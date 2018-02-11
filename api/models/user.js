var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt');


var user = new Schema({
  username: {
    type: String,
    required: [true, 'No username'],
    unique: [true, 'Username already exists'],
    match: /^[a-z0-9]*$/

  },
  name: {
    first: {
      type: String,
      required: [true, 'No first name']
    },
    last:{
      type: String,
      required: [true, 'No last name']
    },
  },
  password: {
    type: String,
    required: [true, 'No password'],
    select: false      //password is not selected by default, remember
  },                    //to select when comparing
  acceptFollows: Boolean

});
user.methods.verifyPassword = function(password, callback) {
  if (!this.password) {
    return callback(null, true);
  }
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    } else {
      return callback(null, isMatch);
    }
  });
};
user.pre('save', function(next) {
  var SALT_WORK_FACTOR = 12;
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', user);
