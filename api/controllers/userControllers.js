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
  // res.json(
  //   {
  //     users: [
  //       {
  //         _id: "12345",
  //         userName: "jannekol",
  //         name: "Janne Kolehmainen"
  //       },
  //       {
  //         _id: "d12dsd45",
  //         userName: "tommo",
  //         name: "Tommi Kolehmainen"
  //       }
  //     ]
  //   });
    // Post.find({conversationId: req.params.conversationId},
    //   (err, messages) => {
    //     if (err) {
    //       res.status(500).send(err);
    //     } else {
    //       res.json(messages);
    //     }
    //
    //   }
    // );
};



  exports.addUser = function (req, res, next) {

    console.log('body',req.body);
    let user = new User(req.body);

    user.save(  (err, message) => {
      if (err) {
        next(err);
      } else {
        res.json(message);
      }
    }  );
  };
