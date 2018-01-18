
var controller = require('../controllers/controllers');

module.exports = function(app) {
  app.route('/api/posts/')
    .get(controller.getPosts)
    .post(controller.postPost);

  app.route('/api/internalError/')
    .get(controller.error);

  app.route('/api/:something')
    .all((req, res)=>{res.status(404).json({error: "Wrong api url"});});
};
