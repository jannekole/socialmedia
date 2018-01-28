import React, {Component} from 'react';
import PropTypes from 'prop-types';

class LoginPage extends Component  {

  constructor(props) {
    super(props);
    this.state = {userNameInput: "", notification: ""};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    let userName = this.state.userNameInput;
    if (userName == "") {
      this.setState({notification: "Enter a username"});
    } else {
      this.props.login(this.state.userNameInput);
    }
    e.preventDefault();

  }

  handleInputChange(e) {
    this.setState({notification: ""});
    this.setState({userNameInput: e.target.value});
    e.preventDefault();
  }

  render() {
    let notification = this.state.notification || this.props.notification;

    return <div className="content">
      <div className="postList">
        <div className="post">
          <form onSubmit={this.handleSubmit}>
            <label>
              {"Enter your username: "}
              <input  name="userName" className="" onChange={this.handleInputChange} value={this.state.input} type="text" autoFocus="true" disabled={this.state.isDisabled} >

              </input>
            </label>
            <input type="submit" disabled={this.state.isDisabled} value="Log in" />
            <div className="notification">{this.state.isLoading ? 'loading...' : null }{notification} </div>
          </form>
        </div>
      </div>
    </div>;
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  notification: PropTypes.string.isRequired,

};

export default LoginPage;
