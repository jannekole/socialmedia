import TopBar from '../components/TopBar';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut, signIn} from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  var thisUser = state.thisUser;
  //var currentPath = ownProps.location.pathname;

  var isLoading = !!Object.keys(state.loading.likes).length;


  return {
    thisUser,
    isLoading
  //  currentPath
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    signIn : (username) => dispatch(signIn(username)),
    logOut : () => dispatch(logOut())
    //loadPosts: (userFilter) => dispatch(loadPosts("jdksdlkdsl"))

  };
};


const TopBarContainer = connect(mapStateToProps, mapDispatchToProps)(TopBar);

TopBarContainer.propTypes = {

};

export default TopBarContainer;
