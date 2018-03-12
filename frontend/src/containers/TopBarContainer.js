import TopBar from '../components/TopBar';

import { connect } from 'react-redux';
import { logOut, signIn} from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  let thisUser = state.thisUser;

  let numOfLikesLoading = Object.keys(state.loading.likes).length;
  let numOfPostsLoading = Object.keys(state.loading.posts).length;
  let numOfUsersLoading = Object.keys(state.loading.users).length;
  let isLoading = !!(numOfLikesLoading + numOfPostsLoading + numOfUsersLoading);
  return {
    thisUser,
    isLoading
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signIn : (username) => dispatch(signIn(username)),
    logOut : () => dispatch(logOut())
  };
};
const TopBarContainer = connect(mapStateToProps, mapDispatchToProps)(TopBar);

export default TopBarContainer;
