import FrontPage from '../components/FrontPage';


import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
  let thisUser = state.thisUser;
  return {
    thisUser,
  };
};

const FrontPageContainer = connect(mapStateToProps)(FrontPage);
export default FrontPageContainer;
