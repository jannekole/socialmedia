import PostContent from '../components/PostContent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
  let user = ownProps.post.user;
  return {
    user
  };
};

const PostContentContainer = connect(mapStateToProps)(PostContent);

export default PostContentContainer;

PostContentContainer.propTypes = {
  post: PropTypes.object.isRequired
};
