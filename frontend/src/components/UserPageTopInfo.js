import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserLink from '../components/UserLink';

class UserPageTopInfo extends Component {
  constructor(props) {
    super(props);
    this.handleFollowClick = this.handleFollowClick.bind(this);
  }
  componentDidMount() {
  }
  handleFollowClick(e) {
    let { thisUser, user } = this.props;
    let unFollow = this.isFollowing();
    this.props.follow(thisUser.user._id, user._id, unFollow);
    e.preventDefault();
  }
  isFollowing() {
    let { follows ,thisUser, user } = this.props;
    let followerId = thisUser.user._id;
    let followingId = user._id;
    return !!follows.find((follow) => {
      return (follow.followingId === followingId && follow.followerId === followerId);
    });
  }
  renderFollow() {
    if (!this.props.thisUser.isLoggedIn) {
      return null;
    }
    let className = "notLink";
    let followText = "Follow";
    if (this.isFollowing()) {
      className += " activated";
      followText = "Following";
    }
    return <div className={className} onClick={this.handleFollowClick}> {followText} </div>;
  }
  render() {
    let { user } = this.props;
    if (!user) {
      return <div>No user found</div>;
    } else {
      return <div className="userPageTopInfo">
        <div>
          <img src={`/profilepics/${user.userName}.jpg`} alt={user.userName +"'s picture"} className="profilePic" height="200" width="200" />
        </div>
        <div className="userPageInfo">
          <UserLink user={user}/>
          {this.renderFollow()}
          Followers: {user.followers} <br/>
          Following: {user.following} <br/>
        </div>
        <div className="bottomRow">
        </div>
      </div>;
    }
  }
}

export default UserPageTopInfo;

UserPageTopInfo.propTypes = {
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired,
  follows: PropTypes.array.isRequired,
  thisUser: PropTypes.object,
  follow: PropTypes.func.isRequired,
};
