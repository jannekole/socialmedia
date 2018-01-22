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
    var loadError = function(error) {
      return loadPostsError(user, error);
    };

    var loadSuccess = (json) => {
      return loadPostsSuccess(user, json);
    };

    load(dispatch, '/api/posts', loadSuccess, loadError);

    // fetch('/api/posts', {
    //   method: 'GET',
    //   credentials: 'same-origin'
    // }).then((res) => {
    //   if (!res.ok) {
    //     console.log('response not ok');
    //     res.json().then(
    //       (json) => {
    //         console.log('json ok');
    //         dispatch(loadPostsError(user, json.errors));
    //       },
    //       (err) => {
    //         console.log('error parsing json');
    //         dispatch(loadPostsError(user, err));
    //       }
    //     );
    //   } else {
    //     res.json().then(
    //       (json) => {
    //         console.log('json', json);
    //         dispatch(loadPostsSuccess(user, json));
    //       },
    //       (err) => {
    //         console.log('error parsing json');
    //         dispatch(loadPostsError(user, err));
    //       }
    //     );
    //   }
    // }).catch(err => {
    //   console.log('catcherr', err);
    //   dispatch(loadPostsError(user, err));
    // });
    //

  };
};

const load = (dispatch, url, success, error) => {

  console.log('success', success);

  fetch(url, {
    method: 'GET',
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
