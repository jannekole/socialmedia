import Posts from '../components/Posts';
import { loadPosts, changeReplyInputVisibility , getFollows} from '../actions/actions';

import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  let username = ownProps.username;
  let posts = state.posts.items;
  let user = state.users.byUserName[username];
  let userId = "";
  if (user) {
    userId = user._id;
  }
  if (username) {
    posts = posts.filter((post) => {
      return (post.parentUserId === userId);
    });
  }

  let thisUser = state.thisUser;
  let isLoading = state.loading.posts[username];
  return {
    thisUser,
    isDoneFetching: !isLoading,
    isLoading,
    posts
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  let username = ownProps.username;
  return {
    loadPosts: () => dispatch(loadPosts(username)),
    getFollows: (thisUserId) => dispatch(getFollows(thisUserId, null)),
    changeReplyInputVisibility: (postId, visible) => dispatch(changeReplyInputVisibility(postId, username, visible)),
  };
};

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;
