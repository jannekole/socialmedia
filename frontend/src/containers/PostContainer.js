import Post from '../components/Post';
import { postReply, changeReplyInput, sendLike} from '../actions/actions';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    thisUser: state.thisUser.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    postReply: (userName, text, parentId) => dispatch(postReply(userName, text, parentId)),
    changeReplyInput: (text, parentId) => dispatch(changeReplyInput(text, parentId)),
    sendLike: (userName, like, subjectId, type) => dispatch(sendLike(userName, like, subjectId, type))
  };
};

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Post);

export default PostContainer;
