import fetch from 'isomorphic-fetch';



export const loadPostsSuccess = (user) => {
  return {
    type: RECEIVE_POSTS,
    user
  };
};
export const requestPosts = (user) => {
  return {
    type: REQUEST_POSTS,
    user
  };
};

export const loadPosts = (user) => {
  return (dispatch) => {
    dispatch(requestPosts(user));
    setTimeout(() => dispatch(loadPostsSuccess(user)), 1000);
  };
};

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
