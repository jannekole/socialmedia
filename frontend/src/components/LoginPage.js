import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

class LoginPage extends Component  {

  constructor(props) {
    super(props);
    this.state = {signUp: false, username: "", password: "", lastName: "", firstName: "", errors:{}};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
  }
  handleSubmit(e) {
    let username = this.state.username || "";
    let password = this.state.password || "";
    let lastName = this.state.lastName || "";
    let firstName = this.state.firstName || "";


    if (this.validate()) {
      if (this.state.signUp) {
        this.props.signUp(username, password, firstName, lastName);
      } else {
        this.props.signIn(username, password);
      }
    }
    e.preventDefault();
  }
  validate() {
    if (this.state.signUp) {
      return this.validateSignUp();
    } else {
      return this.validateSignIn();
    }
  }
  validateSignUp() {
    let signin = this.validateSignIn();
    let lname = this.checkEmpty("lastName");
    let fname = this.checkEmpty("firstName");

    if (signin && lname && fname) {
      return true;
    } else return false;

  }
  validateSignIn() {
    let uname = this.checkEmpty("username");
    let pword = this.checkEmpty("password");
    if (uname && pword) {
      return true;
    } else return false;

  }
  checkEmpty(fieldName) {
    if(!this.state[fieldName]) {
      this.setState((prevState) => {
        let newState = {...prevState};
        newState.errors[fieldName] = "empty";
        return newState;
      });
      return false;
    } else {
      this.setState((prevState) => {
        let newState = {...prevState};
        delete newState.errors[fieldName];
        return newState;
      });
      return true;
    }
  }
  handleInputChange(e) {
    let name = e.target.name;
    this.setState((prevState) => {
      let newState = {...prevState};
      delete newState.errors[name];
      return newState;
    });
    this.setState({[name]: e.target.value});
    e.preventDefault();
  }
  redirect(shouldRedirect) {
    var redirectUrl = "/"; //this.props.location.pathname;
    return shouldRedirect ? <Redirect to={redirectUrl} /> : null;
  }
  toggleSignUp(e) {
    this.setState({
      signUp: !this.state.signUp,
      errors: {}
    });

    e.preventDefault();
  }
  renderField(label, name, type="text") {
    let autoFocus = false;
    if (name === "username") {
      autoFocus = true;
    }
    let error = this.state.errors[name];
    let className = "inputField";
    if (error === "empty") {
      error = `${label} is required`;
      className= "inputField inputFieldError";
    }
    return <label>
      {label + ": "}
      <input
        name={name}
        className={className}
        onChange={this.handleInputChange}
        value={this.state[name]}
        type={type}
        disabled={this.state.isDisabled}
        placeholder={error}
        autoFocus={autoFocus}
      >
      </input>
    </label>;
  }
  renderSignUp() {
    return <span>
      {this.renderField("First name", "firstName")}
      {this.renderField("Last name", "lastName")}
    </span>;
  }
  render() {
    let notification = this.props.thisUser.loginErrorMessage;
    let finalNotification = "";
    if (notification === "Unauthorized" && !this.state.signUp) {
      finalNotification = "Incorrect username or password";
    } else {finalNotification = notification;}
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
              {this.renderField("Username", "username")}
              {this.renderField("Password", "password", "password")}
              {this.state.signUp ? this.renderSignUp() : null}
              <div className="notification">
                {finalNotification}
              </div>
              <input
                type="submit"
                disabled={this.state.isDisabled}
                value="Submit" />

              <div className="notification">
                {this.state.isLoading ? 'loading...' : null }
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
};

export default LoginPage;
