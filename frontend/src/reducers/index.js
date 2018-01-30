import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import thisUser from './thisUser';
import follows from './follows'; 

const reducer = combineReducers({users, posts, follows, thisUser});

export default reducer;
