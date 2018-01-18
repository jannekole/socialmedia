import fetch from 'isomorphic-fetch';




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
    dispatch(loadPostsPre(user));




    fetch('/api/posts', {
      method: 'GET',
      credentials: 'same-origin'
    }).then((res) => {
      if (!res.ok) {
        console.log('not ok');
        res.json().then(
          (json) => {
            console.log('error json');
            dispatch(loadPostsError(user, json.error));
          },
          (err) => {
            console.log('throwErr');
            dispatch(loadPostsError(user, err));
          }
        );
      } else {
        res.json().then(
          (json) => {
            console.log('json', json);
            dispatch(loadPostsSuccess(user, json));
          }
        );
      }
    }).catch(err => {
      console.log('catcherr', err);
      dispatch(loadPostsError(user, err));
    });


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
