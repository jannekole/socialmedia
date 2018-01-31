import fetch from 'isomorphic-fetch';


export const followSuccess = (data, remove) => {
  console.log('like');
  return {
    type: FOLLOW_SUCCESS,
    data,
    remove
  };
};
export const receiveFollows = (data) => {
  console.log('like');
  return {
    type: FOLLOWS_RECEIVED,
    data
  };
};
export const getFollows = (followerId, followingId) => {
  return (dispatch) => {
    var loadError = function(error) {
      return ()=>null;
    };
    var loadSuccess = (json) => {
      return receiveFollows(json);
    };
    console.log(followerId, followingId);
    let followerUrl = followerId || "null";
    let followingUrl = followingId || "null";
    var url = '/api/follows/' + followerUrl + '/' + followingUrl;
    apiFetch(dispatch, url, loadSuccess, loadError, 'GET');
  };
};
export const follow = (userId, followingId, unFollow=false) => {
  return (dispatch) => {
    var loadError = function(error) {
      return ()=>null;
    };
    var loadSuccess = (json) => {
      return followSuccess(json, unFollow);
    };
    console.log(userId, followingId);

    let data = {
      userId,
      followingId
    };
    let method;
    if (unFollow) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }
    var url = '/api/follows/';
    apiFetch(dispatch, url, loadSuccess, loadError, method, data);
  };
};
export const likeSuccessful = (data) => {
  console.log('like');
  return {
    type: LIKE_RECEIVED,
    data
  };
};
export const sendLike = (userName, like, subjectId, type) => {
  return (dispatch) => {
    var loadError = function(error) {
      return ()=>null;
    };
    var loadSuccess = (json) => {
      return likeSuccessful(json);
    };
    var data = {
      userName,
      like,
      id: subjectId,
      type
    };
    console.log('likepre')
    apiFetch(dispatch, '/api/likes', loadSuccess, loadError, 'PUT', data);
  };
};
export const setThisUser = (user) => {
  return {
    type: CHANGE_THIS_USER,
    user
  };
};
export const logOut = (user) => {
  return {
    type: LOG_OUT
  };
};
const loginError = (errors) => {
  return {
    type: LOGIN_ERROR,
    errors
  };
};
export const login = (userName) => {
  return (dispatch) => {

    var loadError = function(error) {
      return loginError(error);
    };

    var loadSuccess = (json) => {
      return setThisUser(json);
    };


    //dispatch(loadPostsPre(user));
    getUserByName(dispatch, userName, loadSuccess, loadError);


  };
};
const getUserByName = (dispatch, userName, loadSuccess, loadError) => {
  let uri = '/api/users/' + userName;

  apiFetch(dispatch, uri, loadSuccess, loadError, 'GET');


};
export const loadPostsPre = (user) => {
  return {
    type: REQUEST_POSTS,
    user
  };
};

export const loadPostsSuccess = (user, data) => {
  return {
    type: RECEIVE_POSTS,
    user,
    data
  };
};

export const loadPostsError = (user, error) => {
  return {
    type: RECEIVE_POSTS_ERROR,
    user,
    error
  };
};

export const loadPosts = (user, thisUserName) => {
  return (dispatch) => {

    var loadError = function(error) {
      return loadPostsError(user, error);
    };

    var loadSuccess = (json) => {
      return loadPostsSuccess(user, json);
    };
    dispatch(loadPostsPre(user));
    var body = {
      userName: thisUserName
    };
    apiFetch(dispatch, '/api/posts/followed', loadSuccess, loadError, 'PUT', body);


  };
};

export const loadUserSuccess = (userName, data) => {
  return {
    type: RECEIVE_USER,
    userName,
    data
  };
};
export const loadUsers = (userName) => {
  return (dispatch) => {
    //dispatch(loadPostsPre(userName));
    var loadError = function(error) {
      return ()=>{return null;};
    };

    var loadSuccess = (json) => {
      return loadUserSuccess(userName, json);
    };

    apiFetch(dispatch, '/api/users', loadSuccess, loadError, 'GET');


  };
};
const postPostSuccess = (data) => {
  return {
    type: POST_POST_SUCCESS,
    data
  };
};
const postReplySuccess = (data) => {
  return {
    type: POST_REPLY_SUCCESS,
    data
  };
};

export const changeReplyInput = (text, postId) => {
  return {
    type: CHANGE_REPLY_INPUT,
    text,
    postId
  };
};
export const postReply = (userName, text, parentId) => {
  return (dispatch) => {
    //dispatch(loadPostsPre(userName));
    var loadError = function(error) {
      return ()=>{return null;};
    };

    var loadSuccess = (json) => {
      return postReplySuccess(json);
    };

    var data = {
      userName,
      text
    };
    let url = '/api/posts/reply/' + parentId;
    apiFetch(dispatch, url, loadSuccess, loadError, 'POST', data);


  };
};
export const postPost = (userName, text) => {
  return (dispatch) => {
    //dispatch(loadPostsPre(userName));
    var loadError = function(error) {
      return ()=>{return null;};
    };

    var loadSuccess = (json) => {
      return postPostSuccess(json);
    };

    var data = {
      userName,
      text
    };
    apiFetch(dispatch, '/api/posts', loadSuccess, loadError, 'POST', data);


  };
};
var jwtDecode = require('jwt-decode');
export const checkSignIn = () => {
  return (dispatch) => {
    var user = {};
    var token = localStorage.getItem('token') || null;
    if (token) {
      var { _id, userName } = jwtDecode(token);
      user = {userName, _id};
    }
    dispatch(setThisUser(user));
  };
};

const handleTokenReceve = (handle) => (json) => {
  if (json.token) {
    localStorage.setItem('token', json.token);
    //
    var { _id, userName } = jwtDecode(json.token);
    let user = {userName, _id};
    console.log('local storage set:', json.token, user);
    return setThisUser(user);
  } else {
    console.log('error logging in', handle);
    return ()=>null;
  }
};
export const signIn = (username, password) => {
  return (dispatch) => {
    //dispatch(loadPostsPre(userName));
    var loadError = function(error) {
      return ()=> null;
    };
    var loadSuccess = handleTokenReceve('signin');
    var data = {
      username,
      password
    };
    apiFetch(dispatch, '/api/signin', loadSuccess, loadError, 'POST', data);
  };
};

export const signUp = (userName, password, firstName, lastName) => {
  return (dispatch) => {
    //dispatch(loadPostsPre(userName));
    var loadError = function(error) {
      return ()=> null;
    };
    var loadSuccess = handleTokenReceve('signup');
    var data = {
      userName,
      password,
      name: {
        first: firstName,
        last: lastName
      }
    };
    apiFetch(dispatch, '/api/users/', loadSuccess, loadError, 'POST', data);
  };
};
const apiFetch = (dispatch, url, success, error, method, data) => {
  let token = localStorage.getItem('token') || null;
  fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }),
    credentials: 'same-origin'
  }).then((res) => {
    if (!res.ok) {
      console.log('response not ok!');
      if (res.status === 401) {
        localStorage.removeItem('token');
        dispatch(logOut());
        dispatch(error("Could not access posts"));
      }
      console.log('fin');
      res.json().then(
        (json) => {
          console.log('json ok');
          dispatch(error(json.errors));
        },
        (err) => {
          console.log('error parsing json');
          dispatch(error(err));
        }
      );
    } else {
      res.json().then(
        (json) => {
          console.log('json', json);
          dispatch(success(json));
        },
        (err) => {
          console.log('error parsing json');
          dispatch(error(err));
        }
      );
    }
  }).catch(err => {
    console.log('catcherr', err);
    dispatch(error(err));
  });


};




export const changeReplyInputVisibility = (postId, user, visible) => {
  return {
    type: REPLY_INPUT_VISIBILITY,
    postId,
    user,
    visible
  };
};

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POSTS_ERROR = 'RECEIVE_POSTS_ERROR';
export const REPLY_INPUT_VISIBILITY = 'REPLY_INPUT_VISIBILITY';
export const CHANGE_REPLY_INPUT = 'CHANGE_REPLY_INPUT';

export const RECEIVE_USER = 'RECEIVE_USER';
export const CHANGE_THIS_USER = 'CHANGE_THIS_USER';
export const LOG_OUT = 'LOG_OUT';

export const LOGIN_ERROR = 'LOGIN_ERROR';

export const POST_POST_SUCCESS = 'POST_POST_SUCCESS';
export const POST_REPLY_SUCCESS = 'POST_REPLY_SUCCESS';
export const LIKE_RECEIVED = 'LIKE_RECEIVED';

export const FOLLOWS_RECEIVED = 'FOLLOWS_RECEIVED';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
