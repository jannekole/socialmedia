import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostContainer from '../containers/PostContainer';

import sortPostsByDate from '../utils/sortPostsByDate';

class Posts extends Component {

  componentDidMount() {
    this.props.loadPosts(this.props.thisUser.user.userName);
    this.props.getFollows(this.props.thisUser.user._id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.routerKey !== this.props.routerKey) {
      this.props.loadPosts(this.props.thisUser.user.userName);
      console.log('thisuser',this.props.thisUser.user._id)
      this.props.getFollows(this.props.thisUser.user._id);
    }
  }

  render() {
    var secondsFromObjectId = function (objectId) {
      return parseInt(objectId.substring(0, 8), 16);
    };
    let posts;
    let order = 1; // -1 to reverse
    if (this.props.posts) {
      posts = this.props.posts
        .filter((post) => {
          return post.parentId === "000000000000000000000000" || !post.parentId;
        });
      sortPostsByDate(posts, 1);
      //posts.sort((a, b) => {return order * (secondsFromObjectId(b._id) - secondsFromObjectId(a._id));});
      posts = posts.map((post) => {
        let replies = this.props.posts.filter((childPost) => {
          return post._id === childPost.parentId;
        });
        return <PostContainer post={post} user={post.user} changeReplyInputVisibility={this.props.changeReplyInputVisibility} replies={replies} key={post._id} />;
      });
    }

    const loadingIndicator = (isDoneFetching) => {
      return !isDoneFetching
        ? <div className="post infoBox">Loading... </div>
        : null;
    };

    const nothingHereIndicator = (isDoneFetching) => {
      return isDoneFetching && !posts.length
        ? <div className="post infoBox">{"There doesn't seem to be anything here"} </div>
        : null;
    };

    return <div>
      {loadingIndicator(this.props.isDoneFetching)}
      {posts}
      {nothingHereIndicator(this.props.isDoneFetching)}
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
};
