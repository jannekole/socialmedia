import LoginPage from '../components/LoginPage';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  var user = state.thisUser.user;
  var { thisUser } = state;

  return {
    thisUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    // signIn : (userName) => dispatch(signIn(userName))

  };
};


const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

LoginPageContainer.propTypes = {

};

export default LoginPageContainer;
