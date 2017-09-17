import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link, NavLink } from 'react-router-dom';

class TopBar extends Component {


  render() {

    return <div className="topBarContainer">
      <div className="topBar">
        <div className="topBarLeft">

          <NavLink to="/userpage" className="topBarButton">
            <div className="buttonText">My page</div>
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

};

var x = <div className="topBarButton">

  <span className="helper"></span>
  <img  src="/messages.png" />

</div>;
