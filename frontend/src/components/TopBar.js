import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {searchInput: ""};
    this.handleSearch = this.handleSearch.bind(this);
    this.logOutClick = this.logOutClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  logOutClick(e) {
    this.props.logOut();
    e.preventDefault();
  }
  handleSearch(e) {
    if (this.state.searchInput) {
      var address = "/user/" + this.state.searchInput;
      this.props.history.push(address);
    }

    e.preventDefault();
  }
  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value});
    e.preventDefault();
  }
  render() {
    var { user, isLoggedIn } = this.props.thisUser;
    var userName = user.userName;
    var { isLoading } = this.props;
    var userNameText = isLoggedIn ? userName : "Log in";

    var loginUrl = "/login/"; // + "?redirect=" + this.props.currentPath;
    var userUrl = "/user/" + userName;
    var url = isLoggedIn ? userUrl : loginUrl;
    var topBarContent = <div className="topBar">
      {isLoading ? <div className="loader"></div> : null}
      <div className="topBarLeft">
        <NavLink to="/" className="topBarElement topBarButton">
          <div className="buttonText">Home</div>
        </NavLink>
        <NavLink to={url} className="topBarElement topBarButton">
          <div className="buttonText">{userNameText}</div>
        </NavLink>
      </div>

      <div className="topBarCenter">
        <div className="topBarElement">
          <form onSubmit={this.handleSearch}>
            <input className="searchInput" placeholder="Username" onChange={this.handleInputChange} name="searchInput" type="text" />
          </form>
        </div>
        <a href="" onClick={this.handleSearch} className="topBarElement topBarButton">
          <div className="buttonText">Go</div>
        </a>
      </div>

      <div className="topBarRight">
        <a href="/" onClick={this.logOutClick} className="topBarElement topBarButton">
          <div className="buttonText">Log out</div>
          {/* <img  src="/messages.png" alt="Messages"/> */}
        </a>
      </div>
    </div>;

    var topBarempty = <div className="topBar">
      <div className="topBarLeft">
        <NavLink to="/" className="topBarElement topBarButton">
          <div className="buttonText">Home</div>
        </NavLink>
      </div>
    </div>;

    return <div className="topBarContainer">
      {isLoggedIn ? topBarContent : topBarempty}
    </div>;
  }
}

export default TopBar;

TopBar.propTypes = {
  thisUser: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};
