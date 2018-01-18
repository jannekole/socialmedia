var Post = require('../models/post');


exports.error = (req, res) => {
  throw new Error('something went wrong');
};


exports.getPosts = function (req, res) {

  res.json(
    {
      posts:[{
        userId: "12345",
        _id: "kkl3k3k32",
        text: "post from api"
      }],
      users: [
        {
          _id: "12345",
          userName: "jannekole",
          name: "Janne Kolehmainen"
        },
        {
          _id: "d12dsd45",
          userName: "tommo",
          name: "Tommi Kolehmainen"
        }
      ],
      replies: [{
        parentId: "kkl3k3k32",
        userId: "d12dsd45",
        text: "reply from api"
      }]
    });
  Post.find({conversationId: req.params.conversationId},
    (err, messages) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(messages);
      }

    }
  );
};



exports.postPost = function (req, res) {
  req.body.conversationId = req.params.conversationId;

  let message = new Post(req.body);

  message.save(  (err, message) => {
    console.log('here');
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(message);
    }
  }  );
};
