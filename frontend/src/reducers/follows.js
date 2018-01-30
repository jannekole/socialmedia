import { POST_POST_SUCCESS, CHANGE_REPLY_INPUT, POST_REPLY_SUCCESS, LIKE_RECEIVED, FOLLOWS_RECEIVED, FOLLOW_SUCCESS } from '../actions/actions';

import merge from './merge';

const followsReducer = (state = [], action) => {
  switch (action.type) {
    case FOLLOWS_RECEIVED:
    case FOLLOW_SUCCESS:{
      let receivedFollows = action.data.follows;
      let { remove } = action;
      let newState = merge(state, receivedFollows, remove);
      return newState;
    }
    default:
      return state;
  }
};
export default followsReducer;
