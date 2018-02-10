import { REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_POSTS_ERROR, RECEIVE_USER,
  REPLY_INPUT_VISIBILITY, POST_POST_SUCCESS, CHANGE_REPLY_INPUT,
  POST_REPLY_SUCCESS, POST_REPLY_ERROR, POST_REPLY_PRE, POST_POST_ERROR,
  POST_POST_PRE, LIKE_PRE, LIKE_RECEIVED, LIKE_ERROR} from '../actions/actions';

import merge from './merge';

const loading = (state = {postReplies:{}, likes:{}}, action) => {
  console.log(state, action);
  switch (action.type) {

    case LIKE_PRE: {
      let newState = {...state};
      newState.likes[action.postId] = true;
      return newState;
    }
    case LIKE_ERROR:
    case LIKE_RECEIVED: {
      let newState = {...state};
      delete newState.likes[action.postId];
      return newState;
    }
    case POST_REPLY_PRE: {
      let newState = {...state};
      newState.postReplies[action.postId] = true;
      return newState;
    }
    case POST_REPLY_ERROR:
    case POST_REPLY_SUCCESS: {
      let newState = {...state};
      delete newState.postReplies[action.postId];
      return newState;
    }
    default:
      return state;
  }
};
export default loading;
