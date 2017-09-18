

var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');


var port = process.env.PORT || 3001;
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  console.log("production");
}
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'))
});

app.listen(port);

console.log('Server running on port ' + port);
