var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var reply = new Schema({
  parentId: {
    type: Schema.Types.ObjectId,
    required: [true, 'No parentId']
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'No userId']
  },
  text: {
    type: String,
    required: [true, 'No text']
  }

});

module.exports = mongoose.model('Reply', reply);
