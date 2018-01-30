import LoginPage from '../components/LoginPage';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  var user = state.thisUser.user;
  var { thisUser } = state;

  return {
    thisUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    login: (userName) => dispatch(login(userName))

  };
};


const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

LoginPageContainer.propTypes = {

};

export default LoginPageContainer;
