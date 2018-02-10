var Follow = require('../models/follow');
var User = require('../models/user');

exports.addFollow = function (req, res, next) {

  var followerId = req.user._id;
  var followingId = req.userToFollow._id;
  var {acceptFollows} = req.userToFollow;
  var accepted = false;
  if (acceptFollows === undefined || acceptFollows) { //remove first cond.
    accepted = true;
  }
  var follow = new Follow({followerId, followingId, accepted});

  follow.save((err, follow) => {
    if (err) {
      if(err.message.startsWith("E11000 ")) {
        console.log(err)
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
  var followerId = req.user._id;
  var followingId = req.userToFollow._id;
  var query = {followerId, followingId};
  console.log('delete query', query)
  Follow.deleteOne(query, (err, result) => {
    if(err) {
      next(err);
    } else {
      console.log('deleteresult', result.result)
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
  let userName = req.params.userName;
  let query = {userName};
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
