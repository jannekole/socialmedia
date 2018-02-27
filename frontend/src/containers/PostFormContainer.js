import PostForm from '../components/PostForm';
import { postReply, changePostInput} from '../actions/actions';

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
    postReply: (username, text, parentId) => dispatch(postReply(username, text, parentId)),
    changeReplyInput: (text, parentId) => dispatch(changePostInput(text, parentId)),
  };
};

const PostFormContainer = connect(mapStateToProps, mapDispatchToProps)(PostForm);

export default PostFormContainer;
