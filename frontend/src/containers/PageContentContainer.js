import React, {Component} from 'react';

import UserPage from '../containers/UserPage';
import LoginPage from '../components/LoginPage';

import { login } from '../actions/actions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Route, withRouter} from 'react-router-dom';



class PageContent extends Component {
  render() {
    var pageContent = <div className="" >
      <Route exact path="/" component={UserPage} />
      <Route path="/user/:userName" component={UserPage} />
      <Route exact path="/userpage" component={UserPage} />
    </div>;
    return <div className="page">
      {this.props.thisUser.user.userName ? pageContent : <LoginPage login={this.props.login} notification={this.props.thisUser.loginErrorMessage} />}
    </div>;
  }
}
PageContent.propTypes = {
  thisUser: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};
PageContent.defaultProps = {

};

const mapStateToProps = (state, ownProps) => {
  var thisUser = state.thisUser;

  return {
    thisUser

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    login: (userName) => dispatch(login(userName))
    //set login notification
  };
};


const PageContentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PageContent));

PageContentContainer.propTypes = {

};

export default PageContentContainer;
