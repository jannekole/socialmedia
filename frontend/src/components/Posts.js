import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from '../components/Post';

import { connect } from 'react-redux';

class Posts extends Component {

  componentDidMount() {
    this.props.loadPosts();
  }


  render() {
    let posts = this.props.posts
      .filter((post) => {
        return post.parentId === "0";
      })
      .map((post) => {
        let replies = this.props.posts.filter((childPost) => {
          return post.id === childPost.parentId;
        });
        let replyInputVisible = post.replyInputVisible || false;
        return <Post post={post} user={post.user} changeReplyInputVisibility={this.props.changeReplyInputVisibility} replyInputVisible={replyInputVisible} replies={replies} key={post.id} />;
      });
    const loadingIndicator = (isFetching) => {
      return isFetching
        ? <div className="post infoBox">Loading... </div>
        : null;
    };

    const nothingHereIndicator = (isFetching) => {
      return !isFetching && !posts.length
        ? <div className="post infoBox">{"There doesn't seem to be anything here"} </div>
        : null;
    };

    return <div className="postList">
      {loadingIndicator(this.props.isFetching)}
      {posts}
      {nothingHereIndicator(this.props.isFetching)}
    </div>;
  }
}

export default Posts;

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  loadPosts: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  changeReplyInputVisibility: PropTypes.func.isRequired
};
