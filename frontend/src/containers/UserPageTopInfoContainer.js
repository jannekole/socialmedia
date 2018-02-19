import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {loadUsers, getFollows, follow} from '../actions/actions';

import UserPageTopInfo from '../components/UserPageTopInfo';


{/* <UserPageTopInfo
  username={this.props.username}
  user={this.props.user}
  loadUser={this.props.loadUser}
  thisUser={this.props.thisUser}
  follows={this.props.follows}
  follow={this.props.follow}
  isLoading={this.props.userIsLoading}
/>; */}
const mapStateToProps = (state, ownProps) => {
  let username = ownProps.username;
  let userFilter = username || "_all";
  let all = !username;

  let user;
  if (!all) {
    user = state.users.byUserName[userFilter];
  }

  let thisUser = state.thisUser;

  let follows = state.follows;

  let userIsLoading = state.loading.users[username];

  return {
    user,
    thisUser,
    follows,
    userIsLoading,
  };
};



const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadUser: (name) => dispatch(loadUsers(name)),
    getFollows: (thisUserId) => dispatch(getFollows(thisUserId, null)),
    follow: (followerId, followingId, unFollow) => dispatch(follow(followerId, followingId, unFollow)),
  };
};


const UserPageTopInfoContainer =  connect(mapStateToProps, mapDispatchToProps)(UserPageTopInfo);

export default UserPageTopInfoContainer;
