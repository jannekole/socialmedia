import fetch from 'isomorphic-fetch';


export const setThisUser = (data) => {

  return {
    type: CHANGE_THIS_USER,
    data
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

export const loadPosts = (user) => {
  return (dispatch) => {

    var loadError = function(error) {
      return loadPostsError(user, error);
    };

    var loadSuccess = (json) => {
      return loadPostsSuccess(user, json);
    };
    dispatch(loadPostsPre(user));
    apiFetch(dispatch, '/api/posts', loadSuccess, loadError, 'GET');


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

const apiFetch = (dispatch, url, success, error, method, data) => {

  console.log('success', success);

  fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'same-origin'
  }).then((res) => {
    if (!res.ok) {
      console.log('response not ok');
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


export const RECEIVE_USER = 'RECEIVE_USER';
export const CHANGE_THIS_USER = 'CHANGE_THIS_USER';

export const LOGIN_ERROR = 'LOGIN_ERROR';

export const POST_POST_SUCCESS = 'POST_POST_SUCCESS';
