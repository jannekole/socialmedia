import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserLink from '../components/UserLink';

class UserPageTopInfo extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    let { user } = this.props;
    return <div className="userPageTopInfo">
      <div>
        <img src={`/${user.userName}.jpg`} alt={user.userName +"'s picture"} className="profilePic" height="200" width="200" />
      </div>
      <div className="userPageInfo">
        <UserLink user={user}/>
        Followers: {user.followers} <br/>
        Following: {user.following}
      </div>
      <div className="bottomRow">
      </div>
    </div>;
  }
}

export default UserPageTopInfo;

UserPageTopInfo.propTypes = {
  user: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};
