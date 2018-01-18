import Posts from '../components/Posts';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadPosts } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {

  let userFilter = ownProps.match.params.userFilter || "_all";

  let user = state.posts.byUser[userFilter];

  let posts = user ? user.items : [];

  let isFetching = user ? (user.isFetching == true) : true;

  return {
    posts,
    isFetching,
    userFilter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    loadPosts: (userFilter) => dispatch(loadPosts("jdksdlkdsl"))

  };
};


const PostList = connect(mapStateToProps, mapDispatchToProps)(Posts);

PostList.propTypes = {
  match: PropTypes.object.isRequired
};

export default PostList;
