# socialmedia
Generic social media site built using React/Redux/Node/MongoDB.

https://socialmedi.herokuapp.com/

(This is hosted on Heroku for free, so loading might be slow the first time)

After signing up, the user can make posts, reply to and like posts, as well as follow others. Following other users adds their posts and any replies to these posts onto the front page.

### Features:

#### Front end:
- React/Redux
- responsive design
- input validation
- different types of "loading states" (loading/done/error) for different actions
- resources are cached for quick user interface

#### Back end:
- Node/Express/MongoDB
- password authentication with JWT sessions
- passwords hashed with bcrypt
- API end points require authentication
- GETting posts only allowed if the user is being followed (although currently follows are automatically accepted)
- input validation

### Todo:
- require that users accept follows to keep posts private
- pagination, including for replies if there are many
- upload profile pictures
- public posts


### Installation:
#### To run development version:
- create a secret.js file in the root folder with the contents: "module.exports = 'your_jwt_secret_here';"
- have mongodb running at 127.0.0.1:27017
- in the root folder start the API with:

`npm install`

`npm start`
- in the frontend folder:

`npm install`

`npm start`
#### To run production version in Heroku:
- set environmental variable "JWT_SECRET" with a secret string
- set environmental variable "MONGODB_URI" with the address of your MongoDB database. This is done automatically if you for example add the mLab MongoDB add-on in Heroku
