import { REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_POSTS_ERROR, RECEIVE_USER,
  REPLY_INPUT_VISIBILITY, POST_POST_SUCCESS, CHANGE_REPLY_INPUT,
  POST_REPLY_SUCCESS, LIKE_RECEIVED, LOG_OUT, FOLLOW_SUCCESS} from '../actions/actions';
import post from './post';
import merge from './merge';

var defaultState = {items: [], isDoneFetching: {}};
const posts = (state = defaultState, action) => {
  state = post(state, action);
  switch (action.type) {
    case REQUEST_POSTS: {
      let isDoneFetching = {...state.isDoneFetching, [action.user]: false};
      return {...state, isDoneFetching};
    }
    // case LIKE_RECEIVED:
    case RECEIVE_POSTS:
    case POST_POST_SUCCESS:
    case POST_REPLY_SUCCESS: {
      let isDoneFetching = {...state.isDoneFetching, [action.user]: true};

      let newState = {...state, isDoneFetching};

      if (action.data.posts) {
        newState.items = merge(newState.items, action.data.posts);
      }
      if (action.data.replies) {
        newState.items = merge(newState.items, action.data.replies);
      }
      return newState;
    }
    case RECEIVE_POSTS_ERROR:{
      let isDoneFetching = {...state.isDoneFetching, [action.user]: true};
      let newState = {...state, isDoneFetching};
      return newState;
    }
    case FOLLOW_SUCCESS: {
      if (!action.remove) {return state;}

      let items = state.items.filter((post) => {return post.parentUserId !== action.userToFollow._id;});
      let newState = {...state, items};

      return newState;
    }
    case LOG_OUT: {
      let newState = {...state, items: []};
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default posts;
