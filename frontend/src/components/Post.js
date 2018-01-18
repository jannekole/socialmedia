import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import PostContentContainer from '../containers/PostContentContainer';


class Post extends Component {
  constructor(props) {
    super(props);
    this.clickReply = this.clickReply.bind(this);

  }

  clickReply(e) {
    let { replyInputVisible } = this.props;
    this.props.changeReplyInputVisibility(
      this.props.post.id, !replyInputVisible);
    e.preventDefault();
  }

  renderReply(reply) {
    return <div className="reply" key={reply.id}>

      <PostContentContainer post={reply}/>
    </div>;
  }
  renderReplies(replies) {
    let renderedReplies = replies.map((reply) => this.renderReply(reply));
    return <div className="replies">{renderedReplies}</div>;
  }
  renderActionBar() {
    return <div className="postActionBar" >
      <a href="#"  className="notLink"> Like </a>
      <a href="#" onClick={this.clickReply} className="notLink"> Reply </a>
      <a href="#"  className="notLink"> Share </a>
    </div>;
  }

  renderReplyBox() {
    let { replyInputVisible } = this.props;

    if (!replyInputVisible) {
      return null;
    }

    return <form>
      <textarea autoFocus="true" className="replyInput" />
    </form>;
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
  user: PropTypes.object.isRequired,
  replies: PropTypes.array.isRequired,
  replyInputVisible: PropTypes.bool.isRequired,
  changeReplyInputVisibility: PropTypes.func.isRequired
};
