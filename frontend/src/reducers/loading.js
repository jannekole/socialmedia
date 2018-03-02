import { REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_POSTS_ERROR, RECEIVE_USER,
  POST_REPLY_SUCCESS, POST_REPLY_ERROR, POST_REPLY_PRE, LIKE_PRE, LIKE_RECEIVED,
  LIKE_ERROR, LOAD_USER_PRE, LOAD_USER_ERROR} from '../actions/actions';

const loading = (state = {postReplies:{}, likes:{}, users:{}, posts:{}}, action) => {
  switch (action.type) {

    case REQUEST_POSTS: {
      let newState = {...state};
      newState.posts = {...state.posts};
      newState.posts[action.user] = true;
      return newState;
    }
    case RECEIVE_POSTS:
    case RECEIVE_POSTS_ERROR: {
      let newState = {...state};
      newState.posts = {...state.posts};
      delete newState.posts[action.user];
      return newState;
    }
    case LOAD_USER_PRE: {
      let newState = {...state};
      newState.users = {...state.users, [action.username]: true};
      return newState;
    }
    case LOAD_USER_ERROR:
    case RECEIVE_USER: {
      let newState = {...state};
      newState.users = {...state.users};
      delete newState.users[action.username];
      return newState;
    }

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
