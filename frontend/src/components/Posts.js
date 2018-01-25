import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from '../components/Post';


class Posts extends Component {

  componentDidMount() {
    this.props.loadPosts();
  }



  render() {
    var secondsFromObjectId = function (objectId) {
      return parseInt(objectId.substring(0, 8), 16);
    };
    let posts;
    let reverse = 1; // -1 to reverse 
    if (this.props.posts) {
      posts = this.props.posts
        .filter((post) => {
          return post.parentId === "0" || !post.parentId;
        });

      posts.sort((a, b) => {return reverse * (secondsFromObjectId(b._id) - secondsFromObjectId(a._id));});
      posts = posts.map((post) => {
        let replies = this.props.posts.filter((childPost) => {
          return post._id === childPost.parentId;
        });
        let replyInputVisible = post.replyInputVisible || false;
        return <Post post={post} user={post.user} changeReplyInputVisibility={this.props.changeReplyInputVisibility} replyInputVisible={replyInputVisible} replies={replies} key={post._id} />;
      });
    }

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

    return <div>
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
