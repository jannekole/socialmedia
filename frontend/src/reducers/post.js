import { REPLY_INPUT_VISIBILITY, CHANGE_REPLY_INPUT,
  POST_REPLY_SUCCESS, LIKE_PRE, LIKE_ERROR} from '../actions/actions';

const post = (state = {}, action) => {
  let newState = {...state};
  newState.items = state.items.map((post) => {
    if (post._id === action.postId) {
      return postReducer(post, action);
    } else {
      return post;
    }
  });
  return newState;
};
const postReducer = (state, action) => {
  switch (action.type) {
    case REPLY_INPUT_VISIBILITY:
      return {...state, replyInputVisible: action.visible};
    case CHANGE_REPLY_INPUT:
      return {...state, replyInputText: action.text};
    case POST_REPLY_SUCCESS:
      return {...state, replyInputText: "", replyInputVisible: false};
    case LIKE_PRE:{
      let likes = state.likes;
      if (action.liked === true) {
        likes = likes.concat(action.userId);
      } else if (action.liked === false) {
        likes = likes.filter((like) => (like !== action.userId));
      }
      return {...state, likes};
    }
    case LIKE_ERROR:{
      let likes = state.likes;
      if (action.liked === false) {
        likes = likes.concat(action.userId);
      } else if (action.liked === true) {
        likes = likes.filter((like) => (like !== action.userId));
      }
      return {...state, likes};
    }
    default:
      return state;
  }
};
export default post;
