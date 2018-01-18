var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var post = new Schema({
  conversationId: {
    type: String,
    required: [true, 'No conversation Id']
  },
  userId: Schema.Types.ObjectId,
  text: {
    type: String,
    required: [true, 'No text']
  }

});

module.exports = mongoose.model('Post', post);
