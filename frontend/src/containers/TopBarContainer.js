import TopBar from '../components/TopBar';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadPosts } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  var thisUser = state.thisUser;
  //var currentPath = ownProps.location.pathname;
  return {
    thisUser,
  //  currentPath
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    //loadPosts: (userFilter) => dispatch(loadPosts("jdksdlkdsl"))

  };
};


const TopBarContainer = connect(mapStateToProps, mapDispatchToProps)(TopBar);

TopBarContainer.propTypes = {

};

export default TopBarContainer;
