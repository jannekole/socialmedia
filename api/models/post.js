let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ObjectId = mongoose.Schema.Types.ObjectId;

let reply = new Schema({
  user: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'No user Id']
    },
    username: {
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

let post = new Schema({

  user: {
    _id: {
      type: String,
      required: [true, 'No user Id']
    },
    username: {
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
  },
  likes: {
    type: [ObjectId]
  },
  parentId: mongoose.Schema.Types.ObjectId,
  parentUserId: mongoose.Schema.Types.ObjectId ,
  previousReplyId: mongoose.Schema.Types.ObjectId

});



module.exports = mongoose.model('Post', post);
