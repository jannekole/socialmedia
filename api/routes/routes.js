var postControllers = require('../controllers/controllers');
var userControllers = require('../controllers/userControllers');
var followControllers = require('../controllers/followControllers');

var passport = require('passport');
var authenticate = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.route('/api/posts/followed/')
    .put(authenticate, followControllers.followsToBody, postControllers.getPosts); //GET /userControllers.userToBody,
  app.route('/api/posts/')
    .post(authenticate, postControllers.postPost);
  app.route('/api/posts/reply/:parentId?')
    .post(authenticate, postControllers.parentPostToBody, postControllers.latestSiblingToBody, postControllers.postReply);

  app.route('/api/users/:userName?')
    .get(userControllers.getUsers)
    .post(userControllers.addUser);

  app.route('/api/likes/')
    .put(authenticate, postControllers.putLike);

  app.route('/api/follows/')
    .put(authenticate, userControllers.followingToBody, followControllers.addFollow);
  app.route('/api/follows/:followerId?/:followingId?')
    .get(followControllers.getFollows);
  app.route('/api/followers/:followingId')
    .get(followControllers.getFollows);
  app.route('/api/following/:followerId')
    .get(followControllers.getFollows);
  app.route('/api/follows/')
    .delete(authenticate, userControllers.followingToBody, followControllers.deleteFollow);

  app.route('/api/internalError/')
    .get(postControllers.error);

  app.route('/api/*')
    .all((req, res)=>{res.status(404).json({errors: ["Wrong api url or HTTP method"]});});
};
