import { REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_POSTS_ERROR, POST_POST_SUCCESS,
  POST_REPLY_SUCCESS,LOG_OUT, FOLLOW_SUCCESS} from '../actions/actions';
import post from './post';
import merge from './merge';

let defaultState = {items: [], isDoneFetching: {}, lastFetched: {}};
const posts = (state = defaultState, action) => {
  state = post(state, action);
  switch (action.type) {
    case REQUEST_POSTS: {
      let lastFetched = {...state.lastFetched};
      lastFetched[action.user] = action.time;

      let isDoneFetching = {...state.isDoneFetching, [action.user]: false};
      return {...state, isDoneFetching, lastFetched};
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
      if (action.type === RECEIVE_POSTS || action.type === REQUEST_POSTS) {
        newState.lastFetched = {...state.lastFetched};
        newState.lastFetched[action.user] = action.time;
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
