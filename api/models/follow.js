let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let follow = new Schema({
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
