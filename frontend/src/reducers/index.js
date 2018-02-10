import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import loading from './loading';
import thisUser from './thisUser';
import follows from './follows';

const reducer = combineReducers({users, posts, follows, thisUser, loading});

export default reducer;
