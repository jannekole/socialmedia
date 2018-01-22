var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'No userId']
  },
  userName: {
    type: String,
    required: [true, 'No username']
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
