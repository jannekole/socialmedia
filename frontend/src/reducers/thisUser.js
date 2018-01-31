import { CHANGE_THIS_USER, LOGIN_ERROR , LOG_OUT } from '../actions/actions';
import jwtDecode from 'jwt-decode';

let user = {};
let isLoggedIn = false;
var token = localStorage.getItem('token') || null;
if (token) {
  var { _id, userName } = jwtDecode(token);
  user = {userName, _id};
  isLoggedIn = true;
}



let initialState = {user, loginErrorMessage: "", isLoggedIn};
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

    default: {
      return state;
    }
  }
};


export default posts;
