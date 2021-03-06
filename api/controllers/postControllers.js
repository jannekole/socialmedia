let Post = require('../models/post');


exports.error = (req, res) => {
  throw new Error('something went wrong');
};
const likePost = (req, res, next) => {
  let userId = req.user._id;
  let like = req.body.like;
  let postId = req.body.id;
  let update;
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
  let user = req.user;
  let like = req.body.like;
  let type = req.body.type;
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
  let _id = req.params.parentId;
  Post.findOne({_id}, (err, post) => {
    if (err) {
      next(err);
    } else if (!post) {
      next({message: "Parent post not found" })
    } else {
      req.parentPost = post;
      next();
    }
  });
};
exports.latestSiblingToBody = function (req, res, next) {
  let parentId = req.params.parentId;
  Post.findOne({parentId}, (err, post) => {
    if (err) {
      next(err);
    } else {
      req.latestPost = post;
      next();
    }
  }).sort({_id: 'desc'});
};
exports.postReply = function (req, res, next) {
  let user = req.user;
  let { text } = req.body;
  let parentId = req.parentPost._id;
  let parentUserId = req.parentPost.user._id;
  let latestPost = req.latestPost;
  let previousReplyId = latestPost ? latestPost._id : null;
  let post = new Post({user, text, parentId, parentUserId, previousReplyId});
  post.save((err, message) => {
    if (err) {
      next(err);
    } else {
      res.json({posts: [message]});
    }
  });
};

exports.getPosts = function (req, res, next) {
  let follows = req.follows;
  Post.find({'parentUserId': { $in: follows}}, (err, posts) => {
    if (err) {
      next(err);
    } else {
      res.json({posts: posts});
    }
  });
};
exports.postPost = function (req, res, next) {
  let user = req.user;
  let text = req.body.text;
  let parentUserId = user._id;

  let post = new Post({user, text, parentUserId});
  post.save((err, message) => {
    if (err) {
      next(err);
    } else {
      res.json({posts: [message]});
    }
  });
};
