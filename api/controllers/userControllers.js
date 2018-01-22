var User = require('../models/user');


exports.error = (req, res) => {
  throw new Error('something went wrong');
};


exports.getUsers = function (req, res) {

  res.json(
    {
      users: [
        {
          _id: "12345",
          userName: "jannekol",
          name: "Janne Kolehmainen"
        },
        {
          _id: "d12dsd45",
          userName: "tommo",
          name: "Tommi Kolehmainen"
        }
      ]
    });
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
    let post = new User(req.body);

    post.save(  (err, message) => {
      console.log('here');
      if (err) {
        next(err);
      } else {
        res.json(message);
      }
    }  );
  };
