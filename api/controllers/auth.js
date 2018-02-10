var jwt = require('jsonwebtoken');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

var User = require('../models/user');

var jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
var secretOrKey = 'iurthj56tdgfke9834jfiyft0k6ghh7630jjcuiy89trgk03uijhokvv9ktrtdgfh';
var opts = {jwtFromRequest, secretOrKey};
var jwtEspireSeconds = 60*60*24*7;
exports.opts = opts;

exports.sendToken = (req, res, next) => {
  console.log('req.user', req.user)
  let options = {expiresIn: jwtEspireSeconds};
  let {userName, _id} = req.user;
  let payload = {userName, _id};
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
      User.findOne({userName: username.toLowerCase()}, function(err, user) {
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
