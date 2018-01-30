
var postControllers = require('../controllers/controllers');
var userControllers = require('../controllers/userControllers');
var followControllers = require('../controllers/followControllers');

module.exports = function(app) {
  app.route('/api/posts/followed/')
    .put(userControllers.userToBody, followControllers.followsToBody, postControllers.getPosts); //GET
  app.route('/api/posts/')
    .post(userControllers.userToBody, postControllers.postPost);
  app.route('/api/posts/reply/:parentId?')
    .post(userControllers.userToBody, postControllers.parentPostToBody, postControllers.latestSiblingToBody, postControllers.postReply);

  app.route('/api/users/:userName?')
    .get(userControllers.getUsers)
    .post(userControllers.addUser);

  app.route('/api/likes/')
    .put(userControllers.userToBody, postControllers.putLike);

  app.route('/api/follows/')
    .put(userControllers.userToBody, userControllers.followingToBody, followControllers.addFollow);
  app.route('/api/follows/:followerId?/:followingId?')
    .get(followControllers.getFollows);
  app.route('/api/followers/:followingId')
    .get(followControllers.getFollows);
  app.route('/api/following/:followerId')
    .get(followControllers.getFollows);
  app.route('/api/follows/')
    .delete(userControllers.userToBody, userControllers.followingToBody, followControllers.deleteFollow);

  app.route('/api/internalError/')
    .get(postControllers.error);

  app.route('/api/*')
    .all((req, res)=>{res.status(404).json({errors: ["Wrong api url or HTTP method"]});});
};
