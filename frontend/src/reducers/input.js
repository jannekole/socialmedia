import { CHANGE_REPLY_INPUT, POST_REPLY_SUCCESS} from '../actions/actions';

const input = (state = {forms:{}}, action) => {
  switch (action.type) {
    case CHANGE_REPLY_INPUT:{
      let forms = {...state.forms, [action.postId]: action.text};
      return {...state, forms};
    }
    case POST_REPLY_SUCCESS:{
      let forms = {...state.forms, [action.postId]: ""};
      return {...state, forms};
    }
    default:
      return state;
  }
};
export default input;
