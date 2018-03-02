import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserLink from '../components/UserLink';
import ActionButton from '../components/ActionButton';

class UserPageTopInfo extends Component {
  constructor(props) {
    super(props);
    this.handleFollowClick = this.handleFollowClick.bind(this);
  }
  componentDidMount() {
    this.props.loadUser(this.props.username);
    this.props.getFollows();
  }
  handleFollowClick(e) {
    let { thisUser, user } = this.props;
    let unFollow = this.isFollowing();
    this.props.follow(thisUser.user._id, user, unFollow);
    e.preventDefault();
  }
  isFollowing() {
    let { follows, thisUser, user } = this.props;
    let followerId = thisUser.user._id;
    let followingId = user._id;
    return !!follows.find((follow) => {
      return (follow.followingId === followingId && follow.followerId === followerId);
    });
  }
  isOwnPage() {
    return this.props.user._id === this.props.thisUser.user._id;
  }
  userFoundPage() {
    let { user } = this.props;
    let url = user.picUrl || "default";
    return <div>
      <div>
        <img src={`/profilepics/${url}.jpg`} alt={user.username +"'s picture"} className="profilePic" height="200" width="200" />
      </div>
      <div className="userPageInfo userPageInfo-l">
        <UserLink user={user}/>
        {this.isOwnPage() ? null : <ActionButton action={this.handleFollowClick} activeText="Following" inactiveText="Follow" isActive={this.isFollowing()} />}
      </div>
      <div className="bottomRow">
      </div>
    </div>;
  }
  render() {
    let { user , userIsLoading} = this.props;
    let content;

    if (!user && !userIsLoading) {
      content = "User not found";
    } else if (!user) {
      content = "";
    }
    else {
      content = this.userFoundPage();
    }
    return <div className="userPageTopInfo userPageTopInfo-l"> {content} </div>;
  }
}
export default UserPageTopInfo;

UserPageTopInfo.propTypes = {
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired,
  getFollows: PropTypes.func.isRequired,
  follows: PropTypes.array.isRequired,
  thisUser: PropTypes.object,
  follow: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  userIsLoading: PropTypes.bool,

};
