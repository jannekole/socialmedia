import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostContentContainer from '../containers/PostContentContainer';
import ActionButton from '../components/ActionButton';
import PostForm from '../components/PostForm';

import sortPostsByDate from '../utils/sortPostsByDate';

class Post extends Component {
  constructor(props) {
    super(props);
    this.clickReply = this.clickReply.bind(this);
    this.clickLike = this.clickLike.bind(this);
  }
  clickReply(e) {
    let { replyInputVisible } = this.props.post;
    this.props.changeReplyInputVisibility(
      this.props.post._id, !replyInputVisible);
    e.preventDefault();
  }
  clickLike(e) {
    let userId = this.props.thisUser._id;
    let {_id } = this.props.post;
    let like = !this.isLiked();
    this.props.sendLike(userId, like, _id, "post");
    e.preventDefault();
  }
  renderReply(reply) {
    let isNew = this.isNew(reply._id);
    return <div className="reply" key={reply._id}>
      <PostContentContainer post={reply} isNew={isNew}/>
    </div>;
  }
  renderReplies(replies) {
    let sortedReplies = sortPostsByDate([...replies], -1);
    let renderedReplies = sortedReplies.map((reply) => this.renderReply(reply));
    return <div className="replies">{renderedReplies}</div>;
  }
  isLiked() {
    let { likes } = this.props.post;
    let { _id } = this.props.thisUser;
    return likes.includes(_id);
  }
  numberOfLikedText() {
    var num = this.props.post.likes.length;
    if (num <= 0) {
      return "";
    } else if (num === 1) {
      return "1 like";
    } else {
      return `${num} likes`;
    }
  }
  isNew(id) {
    return this.props.lastFetched < parseInt(id.substring(0, 8), 16) * 1000;
  }
  renderActionBar() {
    return <div className="postActionBar" >
      <ActionButton action={this.clickReply} isActive={false}>Reply</ActionButton>
      <ActionButton action={this.clickLike} isActive={this.isLiked()}>Like</ActionButton>
      <span className="likesText">{this.numberOfLikedText()}</span>
    </div>;
  }
  renderReplyBox() {
    let { replyInputVisible } = this.props.post;
    if (!replyInputVisible) {
      return null;
    }
    return <PostForm
      rows={2}
      autoFocus={true}
      parentId={this.props.post._id}
      page={this.props.username}>
    </PostForm>;
  }
  render() {
    let isNew = this.isNew(this.props.post._id);
    return <div className="post">
      <PostContentContainer post={this.props.post} isNew={isNew}/>

      {this.renderActionBar()}
      {this.renderReplyBox()}
      {this.renderReplies(this.props.replies)}
    </div>
    ;
  }
}
Post.propTypes = {
  post: PropTypes.object.isRequired,
  replies: PropTypes.array.isRequired,
  changeReplyInputVisibility: PropTypes.func.isRequired,
  postReply: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  changeReplyInput: PropTypes.func.isRequired,
  thisUser: PropTypes.object,
  sendLike: PropTypes.func.isRequired,
  replyIsLoading: PropTypes.bool.isRequired,
  replyInputText: PropTypes.string.isRequired,
  username: PropTypes.string,
  lastFetched: PropTypes.number,
};
export default Post;
