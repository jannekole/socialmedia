var User = require('../models/user');


exports.error = (req, res) => {
  throw new Error('something went wrong');
};

exports.followingToBody = function (req, res, next) {
  var followingId = req.body.followingId;
  var query = {_id: followingId};
  User.findOne(query,
    (err, user) => {
      if (err) {
        console.log('following',err)
        next(err);
      } else if (!user) {
        next({errors: ["User to follow not found"]});
      } else {
        req.userToFollow = user;
        next();
      }
    });
};


exports.userToBody = function (req, res, next) {

  var userName = req.body.userName;
  var query;
  if (userName) {
    query = {userName};
  } else {
    let _id = req.body.userId;
    query = {_id};
  }
  User.findOne(query,
    (err, user) => {
      if (err) {
        next(err);
      } else if (!user) {
        res.status(403);
        res.json({errors: ["Forbidden"]});
      } else {
        req.user = user;
        next();
      }
    });
};

exports.getUsers = function (req, res, next) {

  let userName = req.params.userName;
  let query = {};
  if (userName) {
    query = {userName};
  }
  User.find(query, (err, users) => {
    if (err) {
      next(err);
    } else if (users.length === 0) {
      next({message: "No user found"});
    } else {
      res.json({users});
    }
  });
};



exports.addUser = function (req, res, next) {

  console.log('body',req.body);
  let userName = req.body.userName.toLowerCase();
  let name = req.body.name;
  let user = new User({userName, name});

  user.save((err, message) => {
    if (err) {
      console.log('err.message', err.message)
      if (err.message.startsWith("E11000 ")) {
        err.message = "Username already exists";
      }
      next(err);

    } else {
      res.json(message);
    }
  });
};
