import initialState from './defaultPosts';
import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions/actions';


const userPosts = (state = {items: [], isFetching: false}, action) => {
  switch (action.type) {
    case REQUEST_POSTS: {
      return {...state, isFetching: true};
    }
    case RECEIVE_POSTS: {
      return {...state, isFetching: false};
    }
    default: {
      return ;
    }
  }
};

const posts = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_POSTS:
    case RECEIVE_POSTS:{

      let newState = {...state};
      newState.byUser = {...state.byUser};
      newState.byUser[action.user] = userPosts( state.byUser[action.user], action );


      return newState;
    }
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

    default:
      return state;
  }
};



export default posts;
