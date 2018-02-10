import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

class LoginPage extends Component  {

  constructor(props) {
    super(props);
    this.state = {notification: "", signUp: false};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
  }
  handleSubmit(e) {
    let username = this.state.username || "";
    let password = this.state.password || "";
    let lastName = this.state.lastName || "";
    let firstName = this.state.firstName || "";
    if (!username) {
      this.setState({notification: "Enter a username"});
    } else {
      if (this.state.signUp) {
        this.props.signUp(username, password, firstName, lastName);
      } else {
        this.props.signIn(username, password);
      }
    }

    e.preventDefault();
  }
  handleInputChange(e) {
    this.setState({notification: ""});
    this.setState({[e.target.name]: e.target.value});
    e.preventDefault();
  }
  redirect(shouldRedirect) {
    var redirectUrl = "/"; //this.props.location.pathname;
    return shouldRedirect ? <Redirect to={redirectUrl} /> : null;
  }
  toggleSignUp(e) {
    this.setState({signUp: !this.state.signUp});
    e.preventDefault();
  }
  renderSignUp() {
    return <span>
      <label>
        {"First name: "}
        <input
          name="firstName"
          className="inputField"
          onChange={this.handleInputChange}
          value={this.state.input}
          type="text"
          disabled={this.state.isDisabled} >
        </input>
      </label>
      <label>
        {"Last name: "}
        <input
          name="lastName"
          className="inputField"
          onChange={this.handleInputChange}
          value={this.state.input}
          type="text"
          disabled={this.state.isDisabled} >
        </input>
      </label>
    </span>;
  }
  render() {
    let notification = this.state.notification || this.props.thisUser.loginErrorMessage;

    var { isLoggedIn } = this.props.thisUser;

    var text;
    var toggleLinkText;
    var title;
    if (this.state.signUp) {
      title = "Sign up";
      text = "Already have an account? ";
      toggleLinkText = "Log in";

    } else {
      title = "You are not logged in.";
      text = "Please log in or ";
      toggleLinkText = "sign up";
    }
    return <div className="content">
      <div className="postList">
        <div className="post">

          <div className="formContainer">

            <form onSubmit={this.handleSubmit} className="signInForm">
              <div className="loginTitle"> {title} </div>
              <div className="loginText">{text}
                <a href=""
                  className=" toggleForm"
                  onClick={this.toggleSignUp}>
                  {toggleLinkText}
                </a>
              </div>
              <label>
                {"Username: "}
                <input
                  name="username"
                  className="inputField"
                  onChange={this.handleInputChange}
                  value={this.state.input}
                  type="text"
                  autoFocus="true"
                  disabled={this.state.isDisabled} >
                </input>
              </label>
              <label>
                {"Password: "}
                <input
                  name="password"
                  className="inputField"
                  onChange={this.handleInputChange}
                  value={this.state.input}
                  type="password"
                  disabled={this.state.isDisabled} >
                </input>
              </label>
              {this.state.signUp ? this.renderSignUp() : null}
              <input
                type="submit"
                disabled={this.state.isDisabled}
                value="Submit" />

              <div className="notification">
                {this.state.isLoading ? 'loading...' : null }
                {notification}
              </div>
            </form>
          </div>

          {this.redirect(isLoggedIn)}
        </div>
      </div>
    </div>;
  }
}

LoginPage.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  thisUser: PropTypes.object.isRequired,
  isSignUp: PropTypes.bool

};

export default LoginPage;
