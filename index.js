
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');

var User = require('./api/models/user');

var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var port = process.env.PORT || 3001;
var app = express();



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialmedia');


var routes = require('./api/routes/routes');


//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log(jwt_payload);
  return done(null, jwt_payload);
}));


app.route('/api/signin/')
  .post((req, res, next) => {
    if (req.body.username) {
      let {username} = req.body;
      User.findOne({userName: username}, (err, user) =>{
        if (err) {
          next(err);
        } else if (!user) {
          next({message: "Wrong username or password"});
        } else {
          let options = {expiresIn: 10};
          let {userName, _id} = user;
          let payload = {userName, _id};
          let token = jwt.sign(payload, opts.secretOrKey, options);
          res.json({token});
        }
      });
    } else {
      next({message: "no username given"});
    }
  }
);

routes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  console.log("production");
}

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'))
});

app.use(function (err, req, res, next) {
  console.error("Error message: ", err.message);
  console.error("Error stack: ", err.stack);

  res.status(500).json({errors: [err.message]});
});


app.listen(port);

console.log('Server running on port ' + port);
