import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import thisUser from './thisUser';

const reducer = combineReducers({users, posts, thisUser});

export default reducer;
