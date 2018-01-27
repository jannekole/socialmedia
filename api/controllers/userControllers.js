var User = require('../models/user');


exports.error = (req, res) => {
  throw new Error('something went wrong');
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
