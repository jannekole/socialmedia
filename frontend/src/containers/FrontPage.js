import React, { Component } from 'react';
import PostForm from '../components/PostForm';
import Posts from '../containers/PostsContainer';
import UserPageTopInfo from '../containers/UserPageTopInfoContainer';
import LoginPageContainer from '../containers/LoginPageContainer';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FrontPage extends Component {
  render() {
    let username = this.props.match.params.username;
    let shouldRenderUserPageTop = !!username;
    let shouldRenderPostForm = (!username || username === this.props.thisUser.user.username);
    let { isLoggedIn } = this.props.thisUser;
    if (isLoggedIn) {
      return (
        <div className="page"><div>
          <div className="contentContainer">{shouldRenderUserPageTop ? <UserPageTopInfo
            username={this.props.match.params.username}
            key={this.props.location.key}
          /> : null}
          <div className="content">
            <div className="postList">
              {shouldRenderPostForm ?
                <div className="post">
                  <PostForm
                    rows={4}>
                    Post something:
                  </PostForm>
                </div> : null
              }
              <Posts key={this.props.location.key} username={username}/>
            </div>
          </div>
          </div>
        </div>
        </div>
      );
    } else {
      return <LoginPageContainer />;
    }

  }
}
FrontPage.propTypes = {
  thisUser: PropTypes.object.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  let thisUser = state.thisUser;
  return {
    thisUser,
  };
};

const FrontPageContainer = connect(mapStateToProps)(FrontPage);
export default FrontPageContainer;
