import React, { Component } from 'react';
import PostForm from '../components/PostForm';
import Posts from '../containers/PostsContainer';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FrontPage extends Component {
  render() {
    let username = this.props.username;
    let shouldRenderUserPageTop = !!username;
    let shouldRenderPostForm = (!username || username === this.props.thisUser.username);
    return (
      <div className="page">
        <div>{shouldRenderUserPageTop ? "usertop" : null}</div>
        <div className="content">
          <div className="postList">
            <div className="post">
              {shouldRenderPostForm ?
                <PostForm 
                  rows={4}
                  disabled={this.props.postInputDisabled}>
                  Post something:
                </PostForm> : null
              }
            </div>
            <Posts username={username}/>
          </div>
        </div>
      </div>
    );
  }
}

FrontPage.propTypes = {
  thisUser: PropTypes.object.isRequired,
  username: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  let thisUser = state.thisUser;

  return {
    thisUser,
  };
};

const FrontPageContainer = connect(mapStateToProps)(FrontPage);
export default FrontPageContainer;
