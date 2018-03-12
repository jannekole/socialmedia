import Post from '../components/Post';
import { postReply, changePostInput, sendLike} from '../actions/actions';

import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  let { _id } = ownProps.post;
  return {
    thisUser: state.thisUser.user,
    replyIsLoading: state.loading.postReplies[_id] || false,
    replyInputText: ownProps.post.replyInputText || "",
    lastFetched: state.posts.lastFetched[ownProps.username],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postReply: (username, text, parentId) => dispatch(postReply(username, text, parentId)),
    changeReplyInput: (text, parentId) => dispatch(changePostInput(text, parentId)),
    sendLike: (userId, like, subjectId, type) => dispatch(sendLike(userId, like, subjectId, type))
  };
};

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Post);

export default PostContainer;
