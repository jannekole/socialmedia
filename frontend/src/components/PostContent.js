import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

class PostContent extends Component {


  renderUserLink(user) {

    return <div className="userLinkContainer">
      <Link  to={`/user/${user.username}`} className="userLink">
        <span className="fullName">{user.name}</span>
        <span className="userName">{` @${user.username}`}</span>
      </Link>
    </div>;
  }
  render() {
    return <div className="postContent">
      {this.renderUserLink(this.props.user)}
      <div className="postText">
        {this.props.post.text}
      </div>
    </div>;
  }
}


export default PostContent;

PostContent.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
