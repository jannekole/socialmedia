import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import PostContentContainer from '../containers/PostContentContainer';

class Post extends Component {


  clickReply(e) {
    e.preventDefault();
  }

  renderUserLink(user) {

    return <div className="userLinkContainer">
      <Link  to={`/user/${user.username}`} className="userLink">
        <span className="fullName">{user.name}</span>
        <span className="userName">{` @${user.username}`}</span>
      </Link>
    </div>;
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
      <a href="#" onClick={this.clickReply} className="notLink"> Like </a>
      <a href="#" onClick={this.clickReply} className="notLink"> Reply </a>
      <a href="#" onClick={this.clickReply} className="notLink"> Share </a>
    </div>;
  }


  render() {
    return <div className="post">
      <PostContentContainer post={this.props.post}/>
      {this.renderActionBar()}
      {this.renderReplies(this.props.replies)}

    </div>
    ;
  }
}

export default Post;

Post.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  replies: PropTypes.array.isRequired
};
