var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user = new Schema({
  userName: {
    type: String,
    required: [true, 'No username'],
    unique: [true, 'Username already exists']
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
  }

});

module.exports = mongoose.model('User', user);
