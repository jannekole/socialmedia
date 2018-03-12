let Follow = require('../models/follow');
let User = require('../models/user');

exports.addFollow = function (req, res, next) {

  let followerId = req.user._id;
  let followingId = req.userToFollow._id;
  let {acceptFollows} = req.userToFollow;
  let accepted = false;
  if (acceptFollows === undefined || acceptFollows) { //remove first cond.
    accepted = true;
  }
  let follow = new Follow({followerId, followingId, accepted});

  follow.save((err, follow) => {
    if (err) {
      if(err.message.startsWith("E11000 ")) {
        res.json({follows: [{followerId, followingId}]});
      } else {
        next(err);
      }
    }
    else {
      res.json({follows: [{followerId, followingId}]});
    }
  });
};
exports.deleteFollow = function (req, res, next) {
  let followerId = req.user._id;
  let followingId = req.userToFollow._id;
  let query = {followerId, followingId};
  Follow.deleteOne(query, (err, result) => {
    if(err) {
      next(err);
    } else {
      res.json({follows:[{followerId, followingId, delete: "true"}]});
    }
  });

};
exports.getFollows = function (req, res, next) {
  let query = {};
  let mongoObjIdLength = 24;
  let { followerId, followingId } = req.params;
  if (followerId && followerId.length == mongoObjIdLength) {
    query.followerId = req.params.followerId;
  }
  if (followingId && followingId.length == mongoObjIdLength) {
    query.followingId = req.params.followingId;
  }
  Follow.find(query, (err, follows) => {
    if (err) {
      next(err);
    } else {

      follows = follows.map((follow) => {
        let { followerId ,followingId } = follow;
        return {followerId ,followingId};
      });
      res.json({follows});
    }
  });
};
exports.followsToBody = function (req, res, next) {
  let followerId = req.user._id;
  Follow.find({followerId}, (err, follows) => {
    if (err) {
      next(err);
    } else {
      req.follows = follows.map((follow) => {return follow.followingId.toString();});
      next();
    }
  });
};
exports.filterFollows = function (req, res, next) {
  let username = req.params.username;
  let query = {username};
  User.findOne(query, (err, user) => {
    if (err) {
      next(err);
    } else if (!user) {
      next({message: "User not found"});
    } else {
      req.follows = req.follows.filter((follow)=>(follow == user._id));
      next();
    }
  });
};
exports.addSelfToFollows = function (req, res, next) {
  req.follows = req.follows.concat(req.user._id);
  next();
};

exports.removeFollow = function (req, res, next) {

};
