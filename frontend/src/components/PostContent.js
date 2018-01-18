import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import UserLink from '../components/UserLink';

class PostContent extends Component {


  render() {
    return <div className="postContent">
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
  user: PropTypes.object.isRequired
};
