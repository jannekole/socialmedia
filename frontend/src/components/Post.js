import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostContentContainer from '../containers/PostContentContainer';


class Post extends Component {
  constructor(props) {
    super(props);
    this.clickReply = this.clickReply.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  clickReply(e) {
    let { replyInputVisible } = this.props.post;
    this.props.changeReplyInputVisibility(
      this.props.post._id, !replyInputVisible);
    e.preventDefault();
  }
  handleInputChange(e) {
    this.props.changeReplyInput(e.target.value, this.props.post._id);
    e.preventDefault();
  }
  handleSubmit(e) {
    let userName = this.props.thisUser.userName;
    this.props.postReply(userName, e.target.text.value, this.props.post._id);
    e.preventDefault();
  }

  renderReply(reply) {
    return <div className="reply" key={reply._id}>

      <PostContentContainer post={reply}/>
    </div>;
  }
  renderReplies(replies) {
    let renderedReplies = replies.map((reply) => this.renderReply(reply));
    return <div className="replies">{renderedReplies}</div>;
  }
  renderActionBar() {
    var a;
    return <div className="postActionBar" >
      {/* <a href="#" onClick={a} className="notLink"> Like </a> */}
      <a href="" onClick={this.clickReply} className="notLink"> Reply </a>
      {/* <a href="#" onClick={a} className="notLink"> Share </a> */}
    </div>;
  }

  renderReplyBox() {
    let { replyInputVisible, replyInputText } = this.props.post;

    if (!replyInputVisible) {
      return null;
    }
    return <form onSubmit={this.handleSubmit}>
      <textarea name="text" autoFocus="true" className="replyInput" value={replyInputText} onChange={this.handleInputChange}/>
      <input type="submit" disabled={false} value="Send" />
    </form>;
  }

  render() {
    return <div className="post">
      <PostContentContainer post={this.props.post}/>
      {this.renderActionBar()}
      {this.renderReplyBox()}
      {this.renderReplies(this.props.post.replies)}
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
};
