import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostContentContainer from '../containers/PostContentContainer';
import ActionButton from '../components/ActionButton';
import PostFormContainer from '../containers/PostFormContainer';
import PostForm from '../components/PostForm';

import sortPostsByDate from '../utils/sortPostsByDate';

class Post extends Component {
  constructor(props) {
    super(props);
    this.clickReply = this.clickReply.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
  handleInputChange(e) {
    this.props.changeReplyInput(e.target.value, this.props.post._id);
    e.preventDefault();
  }
  handleSubmit(e) {
    let username = this.props.thisUser.username;
    this.props.postReply(username, e.target.text.value, this.props.post._id);
    e.preventDefault();
  }
  renderReply(reply) {
    return <div className="reply" key={reply._id}>

      <PostContentContainer post={reply}/>
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
    return <PostForm handleSubmit={this.handleSubmit}
      handleInputChange={this.handleInputChange}
      rows={2}
      disabled={this.props.replyIsLoading}
      inputText={this.props.replyInputText}>
    </PostForm>;
  }


  render() {
    return <div className="post">
      <PostContentContainer post={this.props.post}/>
      {this.renderActionBar()}
      {this.renderReplyBox()}
      {this.renderReplies(this.props.replies)}
    </div>
    ;
  }
}

export default Post;

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
};
