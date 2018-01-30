import React, {Component} from 'react';

import UserPage from '../containers/UserPage';
import LoginPage from '../containers/LoginPageContainer';

import { login } from '../actions/actions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Route, withRouter, Switch} from 'react-router-dom';



class PageContent extends Component {
  render() {
    var pageContent = <Switch >
      <Route exact path="/" component={UserPage} />
      <Route path="/user/:userName" component={UserPage} />
      <Route exact path="/userpage" component={UserPage} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>;
    return <div className="page">
      {pageContent}
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
