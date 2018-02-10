import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserLink = (props) => {
  let { user } = props;
  let fullName;
  let username;
  if (!user.name) {
    fullName = "";
  } else {
    let firstName = user.name.first || "";
    let lastName = user.name.last || "";
    fullName = firstName + ' ' + lastName;
  }
  username = user.username || "";

  return <div className="userLinkContainer">
    <Link  to={`/user/${username}`} className="userLink" >
      <span className="fullName">{fullName}</span>
      <span className="username">{` @${username}`}</span>
    </Link>
  </div>;
};

UserLink.propTypes = {
  user: PropTypes.object.isRequired
};
UserLink.defaultProps = {
  user: {}
};

export default UserLink;
