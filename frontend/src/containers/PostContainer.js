import Post from '../components/Post';
import { postReply, changeReplyInput } from '../actions/actions';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    thisUser: state.thisUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    postReply: (userName, text, parentId) => dispatch(postReply(userName, text, parentId)),
    changeReplyInput: (text, parentId) => dispatch(changeReplyInput(text, parentId))
  };
};

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Post);

export default PostContainer;
