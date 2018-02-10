var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');

var auth = require('./api/controllers/auth');
var routes = require('./api/routes/routes');

var port = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialmedia');

var app = express();
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
auth.passportSetupStrategies(passport);

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
