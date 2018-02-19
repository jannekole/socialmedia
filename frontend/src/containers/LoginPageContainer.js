import LoginPage from '../components/LoginPage';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, signUp } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  var { thisUser } = state;

  return {
    thisUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUp: (username, password, firstName, lastName) => dispatch(signUp(username, password, firstName, lastName)),
    signIn : (username, password) => dispatch(signIn(username, password))
  };
};


const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

LoginPageContainer.propTypes = {

};

export default LoginPageContainer;
