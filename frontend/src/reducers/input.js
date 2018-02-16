import { REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_POSTS_ERROR, RECEIVE_USER,
  REPLY_INPUT_VISIBILITY, POST_POST_SUCCESS, CHANGE_REPLY_INPUT,
  POST_REPLY_SUCCESS, POST_REPLY_ERROR, POST_REPLY_PRE, POST_POST_ERROR,
  POST_POST_PRE, LIKE_PRE, LIKE_RECEIVED, LIKE_ERROR, LOAD_USER_PRE, LOAD_USER_ERROR} from '../actions/actions';

import merge from './merge';

const input = (state = {forms:{}}, action) => {
  console.log('type',action.type);
  switch (action.type) {
    case CHANGE_REPLY_INPUT:{
      let forms = {...state.forms, [action.postId]: action.text};
      return {...state, forms};
    }
    case POST_REPLY_SUCCESS:{
      let forms = {...state.forms, [action.postId]: ""};
      return {...state, forms};
    }
    default:
      return state;
  }
};
export default input;
