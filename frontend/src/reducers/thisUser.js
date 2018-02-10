import { CHANGE_THIS_USER, LOGIN_ERROR, POST_POST_ERROR, LOG_OUT, CHANGE_POST_INPUT, POST_POST_SUCCESS, POST_POST_PRE} from '../actions/actions';
import jwtDecode from 'jwt-decode';

let user = {};
let isLoggedIn = false;
var token = localStorage.getItem('token') || null;
if (token) {
  var { _id, username } = jwtDecode(token);
  user = {username, _id};
  isLoggedIn = true;
}

let initialState = {user, loginErrorMessage: "", isLoggedIn, postInput: ""};
// let user = {};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THIS_USER: {
      let user = action.user;
      let isLoggedIn = true;

      let newState = {...state, user, isLoggedIn};
      return newState;
    }
    case LOG_OUT: {
      let newState = {...state, user: {}, isLoggedIn: false};
      return newState;
    }
    case LOGIN_ERROR: {
      let loginErrorMessage = action.errors[0];
      let newState = {...state, loginErrorMessage};
      return newState;
    }
    case CHANGE_POST_INPUT: {
      let newState = {...state, postInput: action.text};
      return newState;
    }
    case POST_POST_PRE: {
      let newState = {...state, postInputDisabled: true};
      return newState;
    }
    case POST_POST_ERROR: {
      let newState = {...state, postInputDisabled: false};
      return newState;
    }
    case POST_POST_SUCCESS: {
      let newState = {...state, postInput: "", postInputDisabled: false};
      return newState;
    }
    default: {
      return state;
    }
  }
};


export default posts;
