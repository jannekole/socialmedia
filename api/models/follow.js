var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var follow = new Schema({
  followerId: {
    type: ObjectId,
    required: [true, "No follower ID"]
  },
  followingId: {
    type: ObjectId,
    required: [true, "No follower ID"]
  },
  accepted: Boolean,
});
follow.index({followerId: 1, followingId: 1}, {unique: true});

module.exports = mongoose.model('Follow', follow);
