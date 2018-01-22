
var controller = require('../controllers/controllers');
var userControllers = require('../controllers/userControllers');

module.exports = function(app) {
  app.route('/api/posts/')
    .get(controller.getPosts)
    .post(controller.userToBody, controller.postPost);

  app.route('/api/users/')
    .get(userControllers.getUsers)
    .post(userControllers.addUser);

  app.route('/api/internalError/')
    .get(controller.error);

  app.route('/api/:something')
    .all((req, res)=>{res.status(404).json({errors: ["Wrong api url"]});});
};
