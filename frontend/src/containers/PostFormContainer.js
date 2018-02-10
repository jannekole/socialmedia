import PostForm from '../components/PostForm';
import { postReply, changeReplyInput} from '../actions/actions';

import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  var { _id } = ownProps;
  if (!_id) {
    _id = "post";
  }
  return {
    thisUser: state.thisUser.user,
    replyIsLoading: state.loading.postReplies[_id] || false,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {


  return {
    postReply: (userName, text, parentId) => dispatch(postReply(userName, text, parentId)),
    changeReplyInput: (text, parentId) => dispatch(changeReplyInput(text, parentId)),
  };
};

const PostFormContainer = connect(mapStateToProps, mapDispatchToProps)(PostForm);

export default PostFormContainer;
