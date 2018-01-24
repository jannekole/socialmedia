import {RECEIVE_USER} from '../actions/actions';

import merge from 'lodash/merge';

const users = (state = {
  byUserName: {}}, action) => {
  switch (action.type) {

    case RECEIVE_USER:{

      let newState = {...state};

      if (action.data.users) {
        console.log('action',action)
        let users = action.data.users;
        let numOfUsers = users.length;
        let newUsers = {};
        for (let i = 0; i < numOfUsers; i++) {
          let user = users[i];
          newUsers[user.userName] = user;
        }
        newState.byUserName =  merge({}, state.byUserName, newUsers);
      }
      console.log('newstate',newState);

      return newState;
    }
    default:
      return state;
  }
};



export default users;
