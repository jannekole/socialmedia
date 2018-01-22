
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');


var port = process.env.PORT || 3001;
var app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/discussion');


var routes = require('./api/routes/routes');

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



routes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  console.log("production");
}

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'))
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({errors: [err.message]});
});


app.listen(port);

console.log('Server running on port ' + port);
