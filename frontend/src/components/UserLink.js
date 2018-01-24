import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserLink = (props) => {
  let { user } = props;
  let fullName;
  let userName;
  if (!user.name) {
    fullName = "- -";
  } else {
    let firstName = user.name.first || "";
    let lastName = user.name.last || "";
    fullName = firstName + ' ' + lastName;
  }
  userName = user.userName || "";

  return <div className="userLinkContainer">
    <Link  to={`/user/${userName}`} className="userLink" >
      <span className="fullName">{fullName}</span>
      <span className="userName">{` @${userName}`}</span>
    </Link>
  </div>;
};

UserLink.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserLink;
