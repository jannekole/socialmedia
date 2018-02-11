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
        next({message: "User to follow not found"});
      } else {
        req.userToFollow = user;
        next();
      }
    });
};


exports.userToBody = function (req, res, next) {


  let { _id } = req.user;
  let query = {_id};

  User.findOne(query,
    (err, user) => {
      if (err) {
        next(err);
      } else if (!user) {
        res.status(403);
        res.json({errors: ["User not found but auth ok"]});
      } else {
        req.user = user;
        next();
      }
    });
};

exports.getUsers = function (req, res, next) {
  let username = req.params.username;
  let query = {};
  if (username) {
    query = {username: username.toLowerCase()};
    console.log(query)
  }
  User.find(query, (err, users) => {
    if (err) {
      next(err);
    } else if (users.length === 0) {
      next({message: "No users found"});
    } else {
      var resUsers = cleanUsers(users);
      res.json({users: resUsers});
    }
  });
};
const cleanUsers = (users) => {
  return users.map((user) => {
    let {username, name, _id} = user;
    return {username, name, _id};
  });
};


exports.addUser = function (req, res, next) {
  let username = req.body.username.toLowerCase();
  let password = req.body.password;
  let { first, last } = req.body.name;
  let name = {first, last};
  let user = new User({username, name, password});

  user.save((err, savedUser) => {
    if (err) {
      if (err.message.startsWith("E11000 ")) {
        err = {message: `Username "${username}" already exists`};
      }
      next(err);
    } else {
      let { username, _id } = savedUser;
      req.user = {username, _id};
      next();
    }
  });
};
