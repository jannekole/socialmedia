# socialmedia
Generic social media site with React/Redux/Node/MongoDB.

https://socialmedi.herokuapp.com/

(This is hosted on Heroku for free, so loading might be slow the first time)

After signing up, the user can make posts, reply to and like posts, as well as follow others. Following other users adds their posts and any replies to these posts onto the front page.

Front end:
-React/Redux
-responsive design
-input validation
-different types of "loading states" (loading/done/error) for different actions
-resources are cached for quick user interface

Back end
-Node/Express/MongoDB
-password authentication with JWT sessions
-API end points require authentication
-GETting posts only allowed if the user is being followed (although currently follows are automatically accepted)
-collections:
--users
--posts/replies (includes likes, user partly denormalized)
--follows
-input validation

Possible additions:
-require that users accept follows to keep posts private
-pagination, including for replies if there are many
-upload profile pictures
