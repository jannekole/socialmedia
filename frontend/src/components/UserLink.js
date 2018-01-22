import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserLink = (props) => {
  let { user } = props;
  let firstName = user.name.first || "";
  let lastName = user.name.last || "";
  let fullName = firstName + ' ' + lastName;
  return <div className="userLinkContainer">
    <Link  to={`/user/${user.userName}`} className="userLink" >
      <span className="fullName">{fullName}</span>
      <span className="userName">{` @${user.userName}`}</span>
    </Link>
  </div>;
};

UserLink.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserLink;
