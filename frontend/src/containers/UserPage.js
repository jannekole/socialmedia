import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPosts, changeReplyInputVisibility } from '../actions/actions';

import Posts from '../components/Posts';
import UserPageTopInfo from '../components/UserPageTopInfo';

class UserPage extends Component {

  // componentWillReceiveProps (nextProps) {
  //   console.log("componentWillReceiveProps");
  //   console.log(nextProps);
  //   if (nextProps.location.key !== this.props.location.key) {
  //
  //     this.componentDidMount();
  //   }
  //
  // }
  componentDidMount () {
    console.log("componentDidMount");
    window.scrollTo(0, 0);
  }

  render() {

    let userPage = null;

    if (this.props.user) {
      userPage = <UserPageTopInfo
        user={this.props.user}
        loadUser={this.props.loadUser}
        isFetching={this.props.userIsFetching}
      />;
    }

    return <div className="page">

      {userPage}
      <div className="content">
        <Posts
          posts={this.props.posts}
          isFetching={this.props.contentIsFetching}
          loadPosts={this.props.loadPosts}
          changeReplyInputVisibility={this.props.changeReplyInputVisibility}
        />
      </div>
    </div>;
  }
}


UserPage.propTypes = {
  posts: PropTypes.array.isRequired,
  contentIsFetching: PropTypes.bool.isRequired,
  loadPosts: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  userName: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {


  let userFilter = ownProps.match.params.userName || "_all";
  let byFilter = state.posts.byUser[userFilter];
  let posts = byFilter ? byFilter.items : [];
  let contentIsFetching = byFilter ? (byFilter.isFetching == true) : true;

  let user;
  if (userFilter !== "_all") {
    user = state.users[userFilter];
  }


  let key = ownProps.location.key;

  return {
    posts,
    contentIsFetching,
    user,
    key

  };
};



const mapDispatchToProps = (dispatch, ownProps) => {

  let userName = ownProps.match.params.userName || "_all";

  return {
    loadPosts: () => dispatch(loadPosts(userName)),
    changeReplyInputVisibility: (postId, visible) => dispatch(changeReplyInputVisibility(postId, userName, visible))
  };
};


const UserPageContainer =  connect(mapStateToProps, mapDispatchToProps)(UserPage);

export default UserPageContainer;



UserPage.propTypes = {
  match: PropTypes.object.isRequired
};
