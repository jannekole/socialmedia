var Post = require('../models/post');
var User = require('../models/user');

exports.error = (req, res) => {
  throw new Error('something went wrong');
};

exports.postReply = function (req, res, next) {
  var user = req.user;
  var text = req.body.text;
  var postId = req.params.postId;
  Post.findOneAndUpdate({_id: postId}, {$push: {replies: {text, user}}}, { runValidators: true, new: true }, (err, post) => {
    if (err) {
      next(err);
    } else {
      res.json({posts: [post]});
    }
  });
};

exports.getPosts = function (req, res, next) {

  Post.find({}, (err, posts) => {
    if (err) {
      next(err);
    } else {
      res.json({posts: posts});
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
      console.log('user',user)
      if (err) {
        next(err);
      } else if (!user) {
        next({message: 'No user found with user name or Id'});
      } else {
        req.user = user;
        next();
      }
    });
};

exports.postPost = function (req, res, next) {
  var user = req.user;
  var text = req.body.text;

  let post = new Post({user, text});

  post.save((err, message) => {
    if (err) {
      console.log('err',err);
      next(err);
    } else {
      res.json({posts: [message]});
    }
  });
};
