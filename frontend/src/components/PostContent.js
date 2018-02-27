import React, { Component } from 'react';
import PropTypes from 'prop-types';


import UserLink from '../components/UserLink';

class PostContent extends Component {

  render() {
    let className = "postContent " + (this.props.isNew ? "newPostContent" : "");
    return <div className={className}>
      <UserLink user={this.props.user}/>
      <div className="postText">

        {this.props.post.text}
      </div>
    </div>;
  }
}


export default PostContent;

PostContent.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isNew: PropTypes.bool,
};
