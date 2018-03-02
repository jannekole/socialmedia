var jwt = require('jsonwebtoken');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

var User = require('../models/user');

var jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

var secretOrKey;
if (process.env.NODE_ENV === "production") {
  secretOrKey = process.env.JWT_SECRET;
  if (!secretOrKey) {
    throw 'No JWT secret found. set enviromental variable JWT_SECRET';
  }
} else {
  secretOrKey = require('../../secret'); //Create a "secret.js" file in the root folder with module.exports = "secret"'
  if (!secretOrKey) {
    throw 'No JWT secret found.';
  }
}


var opts = {jwtFromRequest, secretOrKey};
var jwtEspireSeconds = 60*60*24*7;
exports.opts = opts;

exports.sendToken = (req, res, next) => {
  let options = {expiresIn: jwtEspireSeconds};
  let {username, _id} = req.user;
  let payload = {username, _id};
  let token = jwt.sign(payload, opts.secretOrKey, options);
  res.json({token});
};
exports.localAuthenticate = passport.authenticate('local', { session: false });
exports.jwtAuth = passport.authenticate('jwt', { session: false });

exports.passportSetupStrategies = (passport) => {
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, jwt_payload);
  }));
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log(username.toLowerCase(), password)
      User.findOne({username: username.toLowerCase()}, function(err, user) {
        console.log('user',user);
        if (err) {
          return done(err); }
        if (!user) {
          return done(null, false);
        }
        user.verifyPassword(password, (err, match) => {
          if (err) {
            return done(err);
          } else if (match) {
            console.log(user);
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }).select('+password');
    }
  ));
};
