import React, {Component} from 'react';

import UserPage from '../containers/UserPage';
import LoginPageContainer from '../containers/LoginPageContainer';

import { signUp, signIn } from '../actions/actions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Route, withRouter, Switch} from 'react-router-dom';



class PageContent extends Component {

  render() {
    var pageContent = <Switch >
      <Route exact path="/" component={UserPage} />
      <Route path="/user/:userName" component={UserPage} />
      <Route exact path="/userpage" component={UserPage} />
      <Route exact path="/login" component={LoginPageContainer} />
    </Switch>;
    return <div className="page">
      {this.props.thisUser.isLoggedIn ? pageContent: <LoginPageContainer signUp={this.props.signUp} signIn={this.props.signIn}/>}
    </div>;
  }
}
PageContent.propTypes = {
  thisUser: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
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
    signUp: (userName, password, firstName, lastName) => dispatch(signUp(userName, password, firstName, lastName)),
    signIn : (userName, password) => dispatch(signIn(userName, password))
  };
};


const PageContentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PageContent));

PageContentContainer.propTypes = {

};

export default PageContentContainer;
