import { REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_USER, REPLY_INPUT_VISIBILITY, POST_POST_SUCCESS, CHANGE_REPLY_INPUT, POST_REPLY_SUCCESS, LIKE_RECEIVED} from '../actions/actions';

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

const posts = (state = {items: [], isDoneFetching: {}}, action) => {
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
    default: {
      return state;
    }
  }
};

// const posts = (state = initialState, action) => {
//   switch (action.type) {
//
//     case REQUEST_POSTS:
//     case RECEIVE_POSTS:
//     case REPLY_INPUT_VISIBILITY:{
//
//       let newState = {...state};
//       newState.byUser = {...state.byUser};
//       newState.byUser[action.user] = userPosts( state.byUser[action.user], action );
//
//
//       return newState;
//     }
// case RECEIVE_POSTS: {
//   let post = {
//     parentId: "0",
//     id: "5",
//     user: {
//       name: "Janne Kolehmainen",
//       username: "jannekol"
//     },
//     text: "Eka postaus"
//   };
//
//   let prevItems = state.byUser[action.user] ? state.byUser[action.user].items : [];
//
//   let newItems = [...prevItems, post];
//   let newFrontPage = {...state.byUser[action.user], items: newItems};
//
//   return {...state, frontPage: newFrontPage };
// }

//     default:
//       return state;
//   }
// };



export default posts;
