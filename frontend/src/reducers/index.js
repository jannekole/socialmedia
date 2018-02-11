import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import loading from './loading';
import thisUser from './thisUser';
import follows from './follows';
import { LOG_OUT } from '../actions/actions';


const reducer = combineReducers({users, posts, follows, thisUser, loading});
const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }
  return reducer(state, action);
};

export default rootReducer;
