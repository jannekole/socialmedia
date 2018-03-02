import { apiFetch } from './apiFetch';

export const followSuccess = (data, remove, userToFollow) => {
  return {
    type: FOLLOW_SUCCESS,
    data,
    remove,
    userToFollow
  };
};
export const receiveFollows = (data) => {
  return {
    type: FOLLOWS_RECEIVED,
    data
  };
};
export const getFollows = (followerId, followingId) => {
  return (dispatch) => {
    var loadError = function(error) {
      return null;
    };
    var loadSuccess = (json) => {
      dispatch(receiveFollows(json));
    };
    let followerUrl = followerId || "null";
    let followingUrl = followingId || "null";
    var url = '/api/follows/' + followerUrl + '/' + followingUrl;
    apiFetch(dispatch, url, loadSuccess, loadError, 'GET');
  };
};
export const follow = (userId, userToFollow, unFollow=false) => {
  return (dispatch) => {
    var loadError = function(error) {
      return ()=>null;
    };
    var loadSuccess = (json) => {
      dispatch(followSuccess(json, unFollow, userToFollow));
      dispatch(loadPosts(userToFollow.username));
    };
    let data = {
      userId,
      followingId: userToFollow._id
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
export const likeSuccessful = (data, postId) => {
  return {
    type: LIKE_RECEIVED,
    data,
    postId
  };
};
export const likePre = (postId, liked, userId) => {
  return {
    type: LIKE_PRE,
    postId,
    liked,
    userId
  };
};
export const likeError = (error, postId, liked, userId) => {
  return {
    type: LIKE_ERROR,
    error,
    postId,
    liked,
    userId
  };
};
export const sendLike = (userId, like, subjectId, type) => {
  return (dispatch) => {

    var loadError = function(error) {
      return dispatch(likeError(error, subjectId, like, userId));
    };
    var loadSuccess = (json) => {
      return dispatch(likeSuccessful(json, subjectId));
    };
    var data = {
      userId,
      like,
      id: subjectId,
      type
    };
    dispatch(likePre(subjectId, like, userId));
    apiFetch(dispatch, '/api/likes', loadSuccess, loadError, 'PUT', data);
  };
};
export const setThisUser = (user) => {
  return {
    type: CHANGE_THIS_USER,
    user
  };
};
export const logOut = () => {
  localStorage.removeItem('token');
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
const getUserByName = (dispatch, username, loadSuccess, loadError) => {
  let uri = '/api/users/' + username;
  apiFetch(dispatch, uri, loadSuccess, loadError, 'GET');
};
export const loadPostsPre = (user, time) => {
  return {
    type: REQUEST_POSTS,
    user,
    time
  };
};

export const loadPostsSuccess = (user, data, time) => {
  return {
    type: RECEIVE_POSTS,
    user,
    data,
    time
  };
};

export const loadPostsError = (user, error) => {
  return {
    type: RECEIVE_POSTS_ERROR,
    user,
    error
  };
};

export const loadPosts = (username) => {
  return (dispatch) => {

    let url = '/api/posts/';
    if (username) {
      url = url + username;
    }
    var loadError = function(error) {
      return dispatch(loadPostsError(username, error));
    };

    var loadSuccess = (json) => {
      return dispatch(loadPostsSuccess(username, json, Date.now()));
    };
    dispatch(loadPostsPre(username, Date.now()));
    apiFetch(dispatch, url, loadSuccess, loadError, 'GET');
  };
};

export const loadUserPre = (username) => {
  return {
    type: LOAD_USER_PRE,
    username
  };
};
export const loadUserError = (username, error) => {
  return {
    type: LOAD_USER_ERROR,
    username,
    error
  };
};
export const loadUserSuccess = (username, data) => {
  return {
    type: RECEIVE_USER,
    username,
    data
  };
};
export const loadUsers = (username) => {
  return (dispatch) => {
    dispatch(loadUserPre(username));
    var loadError = function(error) {
      return dispatch(loadUserError(username, error));
    };

    var loadSuccess = (json) => {
      return dispatch(loadUserSuccess(username, json));
    };
    getUserByName(dispatch, username, loadSuccess, loadError);
  };
};
const postPostSuccess = (data) => {
  return {
    type: POST_POST_SUCCESS,
    data
  };
};
export const changePostInput = (text, postId) => {
  return {
    type: CHANGE_REPLY_INPUT,
    text,
    postId
  };
};
const postReplyPre = (parentId) => {
  return {
    type: POST_REPLY_PRE,
    postId: parentId
  };
};
const postReplySuccess = (data, parentId) => {
  return {
    type: POST_REPLY_SUCCESS,
    data,
    postId: parentId
  };
};
const postReplyError = (error, parentId) => {
  return {
    type: POST_REPLY_ERROR,
    error,
    postId: parentId
  };
};
export const postReply = (username, text, parentId) => {
  return (dispatch) => {
    dispatch(postReplyPre(parentId));
    var loadError = function(error) {
      return dispatch(postReplyError(error, parentId));
    };
    var loadSuccess = (json) => {
      return dispatch(postReplySuccess(json, parentId));
    };
    var data = {
      text
    };
    let url;
    if (parentId) {
      url = '/api/posts/reply/' + parentId;
    } else {
      url = '/api/posts/';
    }

    apiFetch(dispatch, url, loadSuccess, loadError, 'POST', data);
  };
};
export const postPostsPre = () => {
  return {
    type: POST_POST_PRE
  };
};
export const postPostsError = () => {
  return {
    type: POST_POST_ERROR
  };
};
export const postPost = (username, text) => {
  return (dispatch) => {
    dispatch(postPostsPre());
    var loadError = function(error) {
      return dispatch(postPostsError(error));
    };
    var loadSuccess = (json) => {
      return dispatch(postPostSuccess(json));
    };
    var data = {
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
      var { _id, username } = jwtDecode(token);
      user = {username, _id};
    }
    dispatch(setThisUser(user));
  };
};

const handleTokenReceve = (json) => {
  if (json.token) {
    localStorage.setItem('token', json.token);
    //
    var { _id, username } = jwtDecode(json.token);
    let user = {username, _id};
    return setThisUser(user);
  } else {
    return ()=>null;
  }
};
export const signIn = (username, password) => {
  return (dispatch) => {
    //dispatch(loadPostsPre(username));
    var loadError = function(error) {
      return dispatch(loginError(error));
    };
    var loadSuccess = (json) => dispatch(handleTokenReceve(json));
    var data = {
      username,
      password
    };
    apiFetch(dispatch, '/api/signin', loadSuccess, loadError, 'POST', data);
  };
};
export const signUp = (username, password, firstName, lastName) => {
  return (dispatch) => {
    //dispatch(loadPostsPre(username));
    var loadError = function(error) {
      return dispatch(loginError(error));
    };
    var loadSuccess = (json) => dispatch(handleTokenReceve(json));
    var data = {
      username,
      password,
      name: {
        first: firstName,
        last: lastName
      }
    };
    apiFetch(dispatch, '/api/users/', loadSuccess, loadError, 'POST', data);
  };
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

export const LOAD_USER_PRE = 'LOAD_USER_PRE';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';
export const RECEIVE_USER = 'RECEIVE_USER';


export const CHANGE_THIS_USER = 'CHANGE_THIS_USER';
export const LOG_OUT = 'LOG_OUT';

export const LOGIN_ERROR = 'LOGIN_ERROR';

export const POST_REPLY_PRE = 'POST_REPLY_PRE';
export const POST_REPLY_ERROR = 'POST_REPLY_ERROR';
export const POST_REPLY_SUCCESS = 'POST_REPLY_SUCCESS';

export const LIKE_RECEIVED = 'LIKE_RECEIVED';
export const LIKE_PRE = 'LIKE_PRE';
export const LIKE_ERROR = 'LIKE_ERROR';

export const FOLLOWS_RECEIVED = 'FOLLOWS_RECEIVED';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';

export const CHANGE_POST_INPUT = 'CHANGE_POST_INPUT';

export const POST_POST_PRE = 'POST_POST_PRE';
export const POST_POST_ERROR = 'POST_POST_ERROR';
export const POST_POST_SUCCESS = 'POST_POST_SUCCESS';
