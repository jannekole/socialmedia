import { REQUEST_POSTS, RECEIVE_POSTS , REPLY_INPUT_VISIBILITY} from '../actions/actions';

import merge from './merge';

const posts = (state = {items: [], isFetching: {}}, action) => {
  switch (action.type) {
    case REQUEST_POSTS: {
      let isFetching = {...state.isFetching, [action.user]: true};
      return {...state, isFetching};
    }
    case RECEIVE_POSTS: {
      let isFetching = {...state.isFetching, [action.user]: false};

      let newState = {...state, isFetching};

      if (action.data.posts) {
        newState.items = merge( action.data.posts, newState.items);
      }
      if (action.data.replies) {
        newState.items = merge(action.data.replies, newState.items);
      }





      return newState;
    }
    case REPLY_INPUT_VISIBILITY: {
      let newState = {...state};

      newState.items = state.items.map((post) => {
        if (post._id === action.postId) {
          return {...post, replyInputVisible: action.visible};
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
