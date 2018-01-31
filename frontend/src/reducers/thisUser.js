import { CHANGE_THIS_USER, LOGIN_ERROR } from '../actions/actions';


const posts = (state = {user: {userName: ""}, loginErrorMessage: ""}, action) => {
  switch (action.type) {
    case CHANGE_THIS_USER: {
      let user = action.user;
      let isLoggedIn = true;
    
      let newState = {...state, user, isLoggedIn};
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
