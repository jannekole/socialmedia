import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

class TopBar extends Component {


  render() {
    var { user, isLoggedIn } = this.props.thisUser;
    var userName = user.userName;
    var userNameText = isLoggedIn ? userName : "Log in";

    var loginUrl = "/login/"; // + "?redirect=" + this.props.currentPath;
    var userUrl = "/user/" + userName;
    var url = isLoggedIn ? userUrl : loginUrl;

    return <div className="topBarContainer">
      <div className="topBar">
        <div className="topBarLeft">

          <NavLink to={url} className="topBarButton">
            <div className="buttonText">{userNameText}</div>
          </NavLink>




        </div>
        <div className="topBarCenter">
          <NavLink to="/" className="topBarButton">
            <div className="buttonText">Home</div>
          </NavLink>
        </div>
        <div className="topBarRight">
          <NavLink to="/login" className="topBarButton">

            <img  src="/messages.png" alt="Messages"/>

          </NavLink>
        </div>
      </div>
    </div>;
  }
}

export default TopBar;

TopBar.propTypes = {
  thisUser: PropTypes.object.isRequired,
};
