let postControllers = require('../controllers/postControllers');
let userControllers = require('../controllers/userControllers');
let followControllers = require('../controllers/followControllers');
let auth = require('../controllers/auth');

let jwtAuth = auth.jwtAuth;
let localAuth = auth.localAuthenticate;
let sendToken = auth.sendToken;

module.exports = function(app) {
  app.route('/api/signin/')
    .post(localAuth, sendToken);

  app.route('/api/posts/')
    .get(jwtAuth, followControllers.followsToBody, followControllers.addSelfToFollows, postControllers.getPosts);
  app.route('/api/posts/:username')
    .get(jwtAuth, followControllers.followsToBody, followControllers.addSelfToFollows, followControllers.filterFollows, postControllers.getPosts);

  app.route('/api/posts/')
    .post(jwtAuth, userControllers.userToBody, postControllers.postPost);
  app.route('/api/posts/reply/:parentId?')
    .post(jwtAuth, userControllers.userToBody, postControllers.parentPostToBody, postControllers.latestSiblingToBody, postControllers.postReply);

  app.route('/api/users/:username')
    .get(jwtAuth, userControllers.getUsers);
  app.route('/api/users/')
    .post(userControllers.addUser, sendToken);

  app.route('/api/likes/')
    .put(jwtAuth, postControllers.putLike);

  app.route('/api/follows/')
    .put(jwtAuth, userControllers.followingToBody, followControllers.addFollow);
  app.route('/api/follows/:followerId?/:followingId?')
    .get(jwtAuth, followControllers.getFollows);
  app.route('/api/followers/:followingId')
    .get(jwtAuth, followControllers.getFollows);
  app.route('/api/following/:followerId')
    .get(jwtAuth, followControllers.getFollows);
  app.route('/api/follows/')
    .delete(jwtAuth, userControllers.followingToBody, followControllers.deleteFollow);

  app.route('/api/internalError/')
    .get(postControllers.error);

  app.route('/api/*')
    .all((req, res)=>{res.status(404).json({errors: ["Wrong api url or HTTP method"]});});
};
