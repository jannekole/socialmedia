var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var reply = new Schema({
  user: {
    _id: {
      type: String,
      required: [true, 'No user Id']
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
  },
  text: {
    type: String,
    required: [true, 'No text']
  }

});

var post = new Schema({

  user: {
    _id: {
      type: String,
      required: [true, 'No user Id']
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
  },

  text: {
    type: String,
    required: [true, 'No text']
  },

  replies: {
    type: [reply]
  }

});



module.exports = mongoose.model('Post', post);
