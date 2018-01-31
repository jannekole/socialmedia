import { REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_POSTS_ERROR, RECEIVE_USER,
  REPLY_INPUT_VISIBILITY, POST_POST_SUCCESS, CHANGE_REPLY_INPUT,
  POST_REPLY_SUCCESS, LIKE_RECEIVED, LOG_OUT} from '../actions/actions';

import merge from './merge';

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case REPLY_INPUT_VISIBILITY:
      return {...state, replyInputVisible: action.visible};
    case CHANGE_REPLY_INPUT:
      return {...state, replyInputText: action.text};
    default:
      return state;
  }
};
var defaultState = {items: [], isDoneFetching: {}};
const posts = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_POSTS: {
      let isDoneFetching = {...state.isDoneFetching, [action.user]: false};
      return {...state, isDoneFetching};
    }
    case LIKE_RECEIVED:
    case RECEIVE_POSTS:
    case POST_POST_SUCCESS:
    case POST_REPLY_SUCCESS:
    case RECEIVE_USER: {
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
    case REPLY_INPUT_VISIBILITY:
    case CHANGE_REPLY_INPUT: {
      let newState = {...state};

      newState.items = state.items.map((post) => {
        if (post._id === action.postId) {
          return postReducer(post, action);
        } else {
          return post;
        }
      });
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
