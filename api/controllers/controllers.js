var Post = require('../models/post');
var User = require('../models/user');

exports.error = (req, res) => {
  throw new Error('something went wrong');
};


exports.getPosts = function (req, res, next) {

  Post.find({}, (err, posts) => {
    if (err) {
      next(err);
    } else {
      res.json({posts: posts});
    }
  });

  // res.json(
  //   {
  //     posts:[{
  //
  //       user:{
  //         userId: "12345",
  //         userName: "jannekol",
  //         name: "Janne Kolehmainen"
  //       },
  //       _id: "kkl3k3k32",
  //       text: "post from api"
  //     }],
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
  //     ],
  //     replies: [{
  //       parentId: "kkl3k3k32",
  //       user:{
  //         userId: "d12dsd45",
  //         userName: "tommo",
  //         name: "Tommi Kolehmainen"
  //       },
  //       text: "reply from api"
  //     }]
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

exports.userToBody = function (req, res, next) {
  var userId = req.body.userId;
  User.findOne({_id: userId},
    (err, user) => {
      console.log('user',user)
      if (err) {
        next(err);
      } else if (!user) {
        next({message: 'No user found with userId'});
      } else {
        req.body.user = user;
        next();
      }
    });
};

exports.postPost = function (req, res, next) {

  console.log('postpost body',req.body);
  let post = new Post(req.body);

  post.save((err, message) => {
    console.log('here');
    if (err) {
      console.log('err',err);
      next(err);
    } else {
      res.json({posts: [message]});
    }
  });
};
