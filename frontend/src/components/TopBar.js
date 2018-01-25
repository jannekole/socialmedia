import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

class TopBar extends Component {


  render() {
    var user = this.props.user;
    var userName = user.userName || "Not logged in";

    return <div className="topBarContainer">
      <div className="topBar">
        <div className="topBarLeft">

          <NavLink to="/" className="topBarButton">
            <div className="buttonText">{userName}</div>
          </NavLink>




        </div>
        <div className="topBarCenter">
          <NavLink to="/" className="topBarButton">
            <div className="buttonText">Home</div>
          </NavLink>
        </div>
        <div className="topBarRight">
          <NavLink to="/" className="topBarButton">

            <img  src="/messages.png" alt="Messages"/>

          </NavLink>
        </div>
      </div>
    </div>;
  }
}

export default TopBar;

TopBar.propTypes = {
  user: PropTypes.object.isRequired

};
