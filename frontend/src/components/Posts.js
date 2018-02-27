import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostContainer from '../containers/PostContainer';

import sortPostsByDate from '../utils/sortPostsByDate';

class Posts extends Component {

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.routerKey !== this.props.routerKey) {
      this.fetchData();
    }
  }
  fetchData() {
    this.props.loadPosts(this.props.thisUser.user.username);
    this.props.getFollows(this.props.thisUser.user._id);
  }
  render() {
    let posts;
    if (this.props.posts) {
      posts = this.props.posts
        .filter((post) => {
          return !post.parentId;
        });
      let sortOrder = 1;
      sortPostsByDate(posts, sortOrder);
      posts = posts.map((post) => {
        let replies = this.props.posts.filter((childPost) => {
          return post._id === childPost.parentId;
        });
        return <PostContainer username={this.props.username} post={post} user={post.user} changeReplyInputVisibility={this.props.changeReplyInputVisibility} replies={replies} key={post._id} />;
      });
    }

    const loadingIndicator = (isLoading) => {
      return isLoading
        ? <div className="post infoBox">Loading... </div>
        : <div className="infoBox infoBoxHidden"></div>;
    };

    const nothingHereIndicator = (isLoading) => {
      return !isLoading && !posts.length
        ? <div className="post infoBox">{"There doesn't seem to be anything here"} </div>
        : null;
    };

    return <div>
      {loadingIndicator(this.props.isLoading)}
      {posts}
      {nothingHereIndicator(this.props.isLoading)}
    </div>;
  }
}

export default Posts;

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  loadPosts: PropTypes.func.isRequired,
  getFollows: PropTypes.func.isRequired,
  isDoneFetching: PropTypes.bool.isRequired,
  changeReplyInputVisibility: PropTypes.func.isRequired,
  routerKey: PropTypes.string,
  thisUser: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  username: PropTypes.string,
};
