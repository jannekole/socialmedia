import Posts from '../components/Posts';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadPosts } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {

  let userName = ownProps.match.params.userName || "_all";

  let user = state.posts.byUser[userName];

  let posts = user ? user.items : [];

  let isFetching = user ? (user.isFetching == true) : true;

  return {
    posts,
    isFetching
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  let userName = ownProps.match.params.userName || "_all";

  return {
    loadPosts: () => dispatch(loadPosts(userName))
  };
};


const PostList = connect(mapStateToProps, mapDispatchToProps)(Posts);

PostList.propTypes = {
  match: PropTypes.object.isRequired
};

export default PostList;
