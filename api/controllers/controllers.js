var Post = require('../models/post');
var User = require('../models/user');

exports.error = (req, res) => {
  throw new Error('something went wrong');
};


const likePost = (req, res, next) => {
  var userId = req.user._id;
  var like = req.body.like;
  var postId = req.body.id;
  var update;
  if (like) {
    update = {
      $addToSet: {likes: userId}  //adds like if it doesn't already exist
    };
  } else {
    update = {
      $pull: {likes: userId}
    };
  }

  Post.findOneAndUpdate(
    {_id: postId},
    update,
    { runValidators: true, new: true },
    (err, post) => {
      if (err) {
        next(err);
      } else {
        res.json({posts: [post]});
      }
    });
};
exports.putLike = function (req, res, next) {
  var user = req.user;
  var like = req.body.like;
  var type = req.body.type;
  switch (type) {
    //case ("reply"):
    case ("post"): {
      likePost(req, res, next);
      break;
    }
    default: {
      next({message: "Type not found"});
      break;
    }
  }


};
exports.parentPostToBody = function (req, res, next) {
  var _id = req.params.parentId;
  Post.findOne({_id}, (err, post) => {
    if (err) {
      next(err);
    } else if (!post) {
      next({message: "Parent post not found" })
    } else {
      req.parentPost = post;
      console.log('parentpost', post);
      next();
    }
  });
};
exports.latestSiblingToBody = function (req, res, next) {
  var parentId = req.params.parentId;
  Post.findOne({parentId}, (err, post) => {
    if (err) {
      next(err);
    // } else if (!post) {
    //   console.log('post',post);
    //   next({message: "Sibling post not found" });
    } else {
      req.latestPost = post;
      next();
    }
  }).sort({_id: 'desc'});
};
exports.postReply = function (req, res, next) {
  var user = req.user;
  var { text } = req.body;
  var parentId = req.parentPost._id;
  var parentUserId = req.parentPost.user._id;
  var latestPost = req.latestPost;
  var previousReplyId = latestPost ? latestPost._id : null;
  var post = new Post({user, text, parentId, parentUserId, previousReplyId});
  post.save((err, message) => {
    if (err) {
      next(err);
    } else {
      res.json({posts: [message]});
    }
  });
  // Post.findOneAndUpdate({_id: parentId}, {$push: {replies: {text, user}}}, { runValidators: true, new: true }, (err, post) => {
  //   if (err) {
  //     next(err);
  //   } else {
  //     res.json({posts: [post]});
  //   }
  // });
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
