var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var post = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'No userId']
  },
  text: {
    type: String,
    required: [true, 'No text']
  }

});

module.exports = mongoose.model('Post', post);
